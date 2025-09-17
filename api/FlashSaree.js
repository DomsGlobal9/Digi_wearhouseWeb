const express = require('express');
const multer = require('multer');
const cors = require('cors');
const axios = require('axios');
const cloudinary = require('cloudinary').v2;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure multer for multiple file uploads
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit per file
    files: 4 // Maximum 4 files
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Gemini API configuration
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image-preview:generateContent';

// Function to upload image to Cloudinary with specific folder for saree parts
async function uploadToCloudinary(fileBuffer, originalName, sareePart) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'image',
        folder: `saree-parts/${sareePart}`,
        public_id: `${sareePart}-${Date.now()}`,
        format: 'jpg',
        quality: 'auto:good',
        width: 1024,
        height: 1024,
        crop: 'limit'
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
    
    uploadStream.end(fileBuffer);
  });
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
    throw new Error(`Failed to download image: ${error.message}`);
  }
}

// Route to handle multiple saree parts draping
app.post('/drape-saree-parts', upload.fields([
  { name: 'blouse', maxCount: 1 },
  { name: 'pleats', maxCount: 1 },
  { name: 'pallu', maxCount: 1 },
  { name: 'shoulder', maxCount: 1 }
]), async (req, res) => {
  let cloudinaryResults = {};
  
  try {
    const files = req.files;
    
    // Check if all 4 parts are uploaded
    const requiredParts = ['blouse', 'pleats', 'pallu', 'shoulder'];
    const missingParts = requiredParts.filter(part => !files[part] || files[part].length === 0);
    
    if (missingParts.length > 0) {
      return res.status(400).json({ 
        error: `Missing saree parts: ${missingParts.join(', ')}. Please upload all 4 parts.`,
        missingParts: missingParts
      });
    }

    // Step 1: Upload all parts to Cloudinary
    const uploadPromises = requiredParts.map(partName => {
      const file = files[partName][0];
      return uploadToCloudinary(file.buffer, file.originalname, partName)
        .then(result => ({ partName, result }));
    });

    const uploadResults = await Promise.all(uploadPromises);
    
    // Store results
    uploadResults.forEach(({ partName, result }) => {
      cloudinaryResults[partName] = result;
    });

    // Step 2: Download all images and convert to base64
    const imageDataPromises = uploadResults.map(async ({ partName, result }) => {
      const imageData = await downloadImageAsBase64(result.secure_url);
      return { partName, imageData };
    });

    const imageDataResults = await Promise.all(imageDataPromises);
    
    // Step 3: Prepare Gemini API request with all 4 images
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
      contents: [
        {
          parts: parts
        }
      ],
      generationConfig: {
        responseModalities: ["TEXT", "IMAGE"],
        temperature: 0.3,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 8192
      }
    };

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
      if (part.inlineData) {
        generatedImageData = part.inlineData;
      } else if (part.inline_data) {
        generatedImageData = part.inline_data;
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
    // Clean up Cloudinary uploads if something went wrong
    if (Object.keys(cloudinaryResults).length > 0) {
      try {
        const cleanupPromises = Object.values(cloudinaryResults).map(result => 
          cloudinary.uploader.destroy(result.public_id)
        );
        await Promise.all(cleanupPromises);
      } catch (cleanupError) {
        console.error('Failed to cleanup Cloudinary uploads:', cleanupError);
      }
    }
    
    let errorMessage = 'Failed to process saree parts';
    let statusCode = 500;
    
    if (error.message.includes('Missing saree parts')) {
      errorMessage = error.message;
      statusCode = 400;
    } else if (error.message.includes('Cloudinary')) {
      errorMessage = 'Failed to upload images to cloud storage';
      statusCode = 503;
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
      uploadedParts: Object.keys(cloudinaryResults)
    });
  }
});

// Keep original single image endpoint
app.post('/drape-saree', upload.single('sareeImage'), async (req, res) => {
  let cloudinaryResult = null;
  
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file uploaded' });
    }

    cloudinaryResult = await uploadToCloudinary(req.file.buffer, req.file.originalname, 'complete-saree');
    const imageData = await downloadImageAsBase64(cloudinaryResult.secure_url);
    
    const requestPayload = {
      contents: [
        {
          parts: [
            {
              text: "Generate a beautiful image showing this saree being elegantly worn by an Indian model. The model should be gracefully posed, and the saree should be draped in traditional Indian style, showcasing its colors, patterns, and fabric beautifully. Make it look realistic and professional, like a fashion photograph."
            },
            {
              inline_data: {
                mime_type: imageData.mimeType,
                data: imageData.data
              }
            }
          ]
        }
      ],
      generationConfig: {
        responseModalities: ["TEXT", "IMAGE"],
        temperature: 0.4,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 8192
      }
    };

    const geminiResponse = await axios.post(GEMINI_API_URL, requestPayload, {
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': GEMINI_API_KEY
      },
      timeout: 120000
    });

    const candidates = geminiResponse.data.candidates;
    const content = candidates[0].content;
    
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

    res.json({
      success: true,
      generatedImage: {
        data: generatedImageData.data,
        mimeType: generatedImageData.mime_type || generatedImageData.mimeType || 'image/png'
      },
      responseText: responseText,
      message: 'Saree draped successfully!',
      cloudinaryUrl: cloudinaryResult.secure_url
    });

  } catch (error) {
    if (cloudinaryResult?.public_id) {
      try {
        await cloudinary.uploader.destroy(cloudinaryResult.public_id);
      } catch (cleanupError) {
        console.error('Failed to cleanup Cloudinary upload:', cleanupError);
      }
    }
    
    res.status(500).json({ 
      error: 'Failed to process saree draping',
      details: error.message
    });
  }
});

// Test Cloudinary connection
app.get('/test-cloudinary', async (req, res) => {
  try {
    const result = await cloudinary.api.ping();
    res.json({
      success: true,
      message: 'Cloudinary connection successful',
      status: result.status
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Cloudinary connection failed',
      details: error.message
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'Server is running', 
    timestamp: new Date().toISOString(),
    model: 'gemini-2.5-flash-image-preview',
    cloudinaryEnabled: !!(cloudinary.config().cloud_name),
    endpoints: [
      'POST /api/drape-saree-parts (4 parts: blouse, pleats, pallu, shoulder)',
      'POST /api/drape-saree (single complete saree)',
      'GET /api/test-cloudinary'
    ],
    sareeParts: ['blouse', 'pleats', 'pallu', 'shoulder']
  });
});

// Export for Vercel serverless
module.exports = app;