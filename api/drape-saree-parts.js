import { IncomingForm } from 'formidable';
import axios from 'axios';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Gemini API configuration
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image-preview:generateContent';

// Function to upload image to Cloudinary
async function uploadToCloudinary(filePath, sareePart) {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: 'image',
      folder: `saree-parts/${sareePart}`,
      public_id: `${sareePart}-${Date.now()}`,
      format: 'jpg',
      quality: 'auto:good',
      width: 1024,
      height: 1024,
      crop: 'limit'
    });
    return result;
  } catch (error) {
    console.error(`Cloudinary upload error for ${sareePart}:`, error);
    throw error;
  }
}

// Function to download image from URL and convert to base64
async function downloadImageAsBase64(imageUrl) {
  try {
    const response = await axios.get(imageUrl, {
      responseType: 'arraybuffer',
      timeout: 30000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    const base64Data = Buffer.from(response.data).toString('base64');
    const contentType = response.headers['content-type'] || 'image/jpeg';
    
    return {
      data: base64Data,
      mimeType: contentType
    };
  } catch (error) {
    console.error('Download image error:', error);
    throw new Error(`Failed to download image: ${error.message}`);
  }
}

// Parse form data
function parseForm(req) {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm({
      maxFileSize: 10 * 1024 * 1024, // 10MB
      maxFiles: 4,
      allowEmptyFiles: false,
      multiples: true
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error('Form parsing error:', err);
        reject(err);
      } else {
        console.log('Form parsed successfully');
        console.log('Files received:', Object.keys(files));
        resolve({ fields, files });
      }
    });
  });
}

// Main API handler
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let cloudinaryResults = {};
  let tempFiles = [];

  try {
    console.log('🔄 Starting API request processing...');

    // Check environment variables
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.GEMINI_API_KEY) {
      console.error('Missing environment variables');
      return res.status(500).json({ 
        error: 'Server configuration error: Missing environment variables',
        missing: [
          !process.env.CLOUDINARY_CLOUD_NAME ? 'CLOUDINARY_CLOUD_NAME' : null,
          !process.env.CLOUDINARY_API_KEY ? 'CLOUDINARY_API_KEY' : null,
          !process.env.CLOUDINARY_API_SECRET ? 'CLOUDINARY_API_SECRET' : null,
          !process.env.GEMINI_API_KEY ? 'GEMINI_API_KEY' : null,
        ].filter(Boolean)
      });
    }

    // Parse form data
    console.log('📋 Parsing form data...');
    const { fields, files } = await parseForm(req);

    // Check if all 4 parts are uploaded
    const requiredParts = ['blouse', 'pleats', 'pallu', 'shoulder'];
    const receivedParts = Object.keys(files).filter(key => requiredParts.includes(key));
    const missingParts = requiredParts.filter(part => !files[part]);
    
    console.log('Received parts:', receivedParts);
    console.log('Missing parts:', missingParts);
    
    if (missingParts.length > 0) {
      return res.status(400).json({ 
        error: `Missing saree parts: ${missingParts.join(', ')}. Please upload all 4 parts.`,
        missingParts: missingParts,
        receivedParts: receivedParts
      });
    }

    // Store temp file paths for cleanup
    Object.values(files).forEach(fileArray => {
      if (Array.isArray(fileArray)) {
        fileArray.forEach(file => tempFiles.push(file.filepath));
      } else if (fileArray.filepath) {
        tempFiles.push(fileArray.filepath);
      }
    });

    // Step 1: Upload all parts to Cloudinary
    console.log('☁️ Uploading to Cloudinary...');
    const uploadPromises = requiredParts.map(async (partName) => {
      const fileArray = files[partName];
      const file = Array.isArray(fileArray) ? fileArray[0] : fileArray;
      
      if (!file || !file.filepath) {
        throw new Error(`No file found for ${partName}`);
      }

      console.log(`Uploading ${partName}: ${file.originalFilename}`);
      const result = await uploadToCloudinary(file.filepath, partName);
      return { partName, result };
    });

    const uploadResults = await Promise.all(uploadPromises);
    
    // Store results
    uploadResults.forEach(({ partName, result }) => {
      cloudinaryResults[partName] = result;
    });

    console.log('✅ All parts uploaded to Cloudinary');

    // Step 2: Download all images and convert to base64
    console.log('🔄 Converting images to base64...');
    const imageDataPromises = uploadResults.map(async ({ partName, result }) => {
      const imageData = await downloadImageAsBase64(result.secure_url);
      return { partName, imageData };
    });

    const imageDataResults = await Promise.all(imageDataPromises);
    
    // Step 3: Prepare Gemini API request
    console.log('🤖 Preparing Gemini API request...');
    const parts = [
      {
        text: `Generate a beautiful and realistic image of a complete saree being elegantly worn by an Indian model. I'm providing you with 4 separate parts of a saree:

1. BLOUSE - The fitted upper garment/top part
2. PLEATS - The folded front portion of the saree
3. PALLU - The decorative end piece that goes over the shoulder
4. SHOULDER - The shoulder draping portion

Please create a cohesive, professional fashion photograph showing all these parts seamlessly combined into one beautiful, traditionally draped saree on an Indian model. The model should be gracefully posed, and the saree should look natural and elegant. Match the colors, patterns, and textures from all 4 parts to create a unified, stunning saree look. Make it look like a high-quality fashion photography shot.

The 4 saree parts are provided below in order:`
      }
    ];

    // Add each image part to the request
    imageDataResults.forEach(({ partName, imageData }) => {
      parts.push({
        text: `${partName.toUpperCase()} PART:`
      });
      parts.push({
        inline_data: {
          mime_type: imageData.mimeType,
          data: imageData.data
        }
      });
    });

    const requestPayload = {
      contents: [{ parts }],
      generationConfig: {
        responseModalities: ["TEXT", "IMAGE"],
        temperature: 0.3,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 8192
      }
    };

    console.log('🚀 Calling Gemini API...');
    const geminiResponse = await axios.post(GEMINI_API_URL, requestPayload, {
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': GEMINI_API_KEY
      },
      timeout: 180000,
      maxBodyLength: 100 * 1024 * 1024,
      maxContentLength: 100 * 1024 * 1024
    });

    // Extract the generated content from response
    const candidates = geminiResponse.data.candidates;
    
    if (!candidates || candidates.length === 0) {
      throw new Error('No candidates in Gemini response');
    }

    const content = candidates[0].content;
    if (!content || !content.parts || content.parts.length === 0) {
      throw new Error('No content parts in Gemini response');
    }

    // Look for image data in the response
    let generatedImageData = null;
    let responseText = '';
    
    for (const part of content.parts) {
      if (part.inlineData || part.inline_data) {
        generatedImageData = part.inlineData || part.inline_data;
      }
      if (part.text) {
        responseText += part.text;
      }
    }

    if (!generatedImageData) {
      throw new Error('No image data found in Gemini response');
    }

    // Prepare response with all uploaded URLs
    const uploadedParts = {};
    Object.entries(cloudinaryResults).forEach(([partName, result]) => {
      uploadedParts[partName] = {
        url: result.secure_url,
        publicId: result.public_id
      };
    });

    console.log('✅ Successfully generated complete saree!');

    res.json({
      success: true,
      generatedImage: {
        data: generatedImageData.data,
        mimeType: generatedImageData.mime_type || generatedImageData.mimeType || 'image/png'
      },
      responseText: responseText,
      message: 'Complete saree generated successfully from all 4 parts!',
      uploadedParts: uploadedParts,
      partsProcessed: requiredParts
    });

  } catch (error) {
    console.error('❌ API Error:', error);
    
    // Clean up Cloudinary uploads if something went wrong
    if (Object.keys(cloudinaryResults).length > 0) {
      try {
        const cleanupPromises = Object.values(cloudinaryResults).map(result => 
          cloudinary.uploader.destroy(result.public_id)
        );
        await Promise.all(cleanupPromises);
        console.log('🧹 Cleaned up Cloudinary uploads');
      } catch (cleanupError) {
        console.error('Failed to cleanup Cloudinary uploads:', cleanupError);
      }
    }
    
    let errorMessage = 'Failed to process saree parts';
    let statusCode = 500;
    
    if (error.message.includes('Missing saree parts')) {
      errorMessage = error.message;
      statusCode = 400;
    } else if (error.message.includes('Cloudinary') || error.message.includes('upload')) {
      errorMessage = 'Failed to upload images to cloud storage';
      statusCode = 503;
    } else if (error.message.includes('environment variables')) {
      errorMessage = 'Server configuration error';
      statusCode = 500;
    } else if (error.response) {
      statusCode = error.response.status;
      
      if (error.response.status === 400) {
        errorMessage = 'Invalid request to AI service';
      } else if (error.response.status === 429) {
        errorMessage = 'Rate limit exceeded - please try again later';
      } else {
        errorMessage = `AI service error: ${error.response.status}`;
      }
    }

    res.status(statusCode).json({ 
      error: errorMessage,
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      uploadedParts: Object.keys(cloudinaryResults)
    });
  } finally {
    // Clean up temporary files
    tempFiles.forEach(filePath => {
      try {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      } catch (cleanupError) {
        console.error('Failed to cleanup temp file:', filePath, cleanupError);
      }
    });
  }
}

// Configure API route
export const config = {
  api: {
    bodyParser: false, // Disable body parsing for file uploads
  },
};