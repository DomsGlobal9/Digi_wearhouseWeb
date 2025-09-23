// import { v2 as cloudinary } from 'cloudinary';
// import axios from 'axios';
// import multer from 'multer';
// import { Readable } from 'stream';


// // Cloudinary configuration
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });

// // Gemini API configuration
// const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
// const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image-preview:generateContent';

// // Multer configuration for memory storage
// const storage = multer.memoryStorage();
// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 5 * 1024 * 1024, // 5MB limit per file
//     files: 4 // Maximum 4 files
//   },
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype.startsWith('image/')) {
//       cb(null, true);
//     } else {
//       cb(new Error('Only image files are allowed!'), false);
//     }
//   }
// });

// // Function to upload image to Cloudinary
// // Function to upload image to Cloudinary
// async function uploadToCloudinary(fileBuffer, sareePart) {
//   return new Promise((resolve, reject) => {
//     const uploadStream = cloudinary.uploader.upload_stream(
//       {
//         resource_type: 'image',
//         folder: `saree-parts/${sareePart}`,
//         public_id: `${sareePart}-${Date.now()}`,
//         format: 'jpg',
//         quality: 'auto:good',
//         width: 512, // Reduced for Vercel
//         height: 512,
//         crop: 'limit'
//       },
//       (error, result) => {
//         if (error) {
//           console.error(`Cloudinary upload error for ${sareePart}:`, error);
//           return reject(error);
//         }
//         console.log(`Upload success for ${sareePart}: ${result.secure_url}`);
//         resolve(result);
//       }
//     );

//     // Pipe the buffer into the Cloudinary upload stream
//     Readable.from(fileBuffer).pipe(uploadStream);
//   });
// }

// // Function to download image from URL and convert to base64
// async function downloadImageAsBase64(imageUrl) {
//   try {
//     console.log(`Downloading image: ${imageUrl}`);
//     const response = await axios.get(imageUrl, {
//       responseType: 'arraybuffer',
//       timeout: 30000,
//       headers: {
//         'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
//       }
//     });
    
//     const base64Data = Buffer.from(response.data).toString('base64');
//     const contentType = response.headers['content-type'] || 'image/jpeg';
    
//     console.log(`Image downloaded and converted to base64`);
//     return {
//       data: base64Data,
//       mimeType: contentType
//     };
//   } catch (error) {
//     console.error('Download image error:', error);
//     throw new Error(`Failed to download image: ${error.message}`);
//   }
// }

// // Main API handler
// export default async function handler(req, res) {
//   // Enable CORS
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
//   );

//   if (req.method === 'OPTIONS') {
//     res.status(200).end();
//     return;
//   }

//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }

//   const uploadMiddleware = upload.fields([
//     { name: 'blouse', maxCount: 1 },
//     { name: 'pleats', maxCount: 1 },
//     { name: 'pallu', maxCount: 1 },
//     { name: 'shoulder', maxCount: 1 }
//   ]);

//   let cloudinaryResults = {};

//   try {
//     // Process file uploads with Multer
//     await new Promise((resolve, reject) => {
//       uploadMiddleware(req, res, (err) => {
//         if (err) {
//           console.error('Multer error:', err);
//           reject(new Error(`File upload error: ${err.message}`));
//         } else {
//           resolve();
//         }
//       });
//     });

//     console.log('Starting API request processing...');
//     const files = req.files;

//     // Check environment variables
//     const missingEnvs = [];
//     if (!process.env.CLOUDINARY_CLOUD_NAME) missingEnvs.push('CLOUDINARY_CLOUD_NAME');
//     if (!process.env.CLOUDINARY_API_KEY) missingEnvs.push('CLOUDINARY_API_KEY');
//     if (!process.env.CLOUDINARY_API_SECRET) missingEnvs.push('CLOUDINARY_API_SECRET');
//     if (!process.env.GEMINI_API_KEY) missingEnvs.push('GEMINI_API_KEY');

//     if (missingEnvs.length > 0) {
//       console.error('Missing environment variables:', missingEnvs);
//       return res.status(500).json({ 
//         error: 'Server configuration error: Missing environment variables',
//         missing: missingEnvs
//       });
//     }

//     // Check if all 4 parts are uploaded
//     const requiredParts = ['blouse', 'pleats', 'pallu', 'shoulder'];
//     const missingParts = requiredParts.filter(part => !files[part] || files[part].length === 0);

//     if (missingParts.length > 0) {
//       return res.status(400).json({ 
//         error: `Missing saree parts: ${missingParts.join(', ')}. Please upload all 4 parts.`,
//         missingParts: missingParts
//       });
//     }

//     console.log('Processing parts:', Object.keys(files));

//     // Step 1: Upload all parts to Cloudinary
//     console.log('Uploading to Cloudinary...');
//     const uploadPromises = requiredParts.map(async (partName) => {
//       const file = files[partName][0];
//       console.log(`Processing ${partName}: ${file.originalname} (${(file.size / 1024 / 1024).toFixed(2)}MB)`);
//       const result = await uploadToCloudinary(file.buffer, partName);
//       return { partName, result };
//     });

//     const uploadResults = await Promise.all(uploadPromises);
    
//     uploadResults.forEach(({ partName, result }) => {
//       cloudinaryResults[partName] = result;
//     });

//     console.log('All parts uploaded to Cloudinary');

//     // Step 2: Download all images and convert to base64
//     console.log('Converting images to base64...');
//     const imageDataPromises = uploadResults.map(async ({ partName, result }) => {
//       const imageData = await downloadImageAsBase64(result.secure_url);
//       return { partName, imageData };
//     });

//     const imageDataResults = await Promise.all(imageDataPromises);
//     console.log('All images converted to base64');

//     // Step 3: Prepare Gemini API request
//     console.log('Preparing Gemini API request...');
//     const parts = [
//       {
//         text: `Generate a beautiful and realistic image of a complete saree being elegantly worn by an Indian model. I'm providing you with 4 separate parts of a saree:

// 1. BLOUSE - The fitted upper garment/top part
// 2. PLEATS - The folded front portion of the saree
// 3. PALLU - The decorative end piece that goes over the shoulder
// 4. SHOULDER - The shoulder draping portion

// Please create a cohesive, professional fashion photograph showing all these parts seamlessly combined into one beautiful, traditionally draped saree on an Indian model. The model should be gracefully posed, and the saree should look natural and elegant. Match the colors, patterns, and textures from all 4 parts to create a unified, stunning saree look. Make it look like a high-quality fashion photography shot.

// The 4 saree parts are provided below in order:`
//       }
//     ];

//     imageDataResults.forEach(({ partName, imageData }) => {
//       parts.push({
//         text: `${partName.toUpperCase()} PART:`
//       });
//       parts.push({
//         inline_data: {
//           mime_type: imageData.mimeType,
//           data: imageData.data
//         }
//       });
//     });

//     const requestPayload = {
//       contents: [{ parts }],
//       generationConfig: {
//         responseModalities: ["TEXT", "IMAGE"],
//         temperature: 0.3,
//         topP: 0.8,
//         topK: 40,
//         maxOutputTokens: 8192
//       }
//     };

//     console.log('Calling Gemini API...');
//     const geminiResponse = await axios.post(GEMINI_API_URL, requestPayload, {
//       headers: {
//         'Content-Type': 'application/json',
//         'x-goog-api-key': GEMINI_API_KEY
//       },
//       timeout: 300000, // 5 minutes
//       maxBodyLength: 50 * 1024 * 1024, // Reduced for Vercel
//       maxContentLength: 50 * 1024 * 1024
//     });

//     console.log('Gemini API response received');

//     const candidates = geminiResponse.data.candidates;
//     if (!candidates || candidates.length === 0) {
//       throw new Error('No candidates in Gemini response');
//     }

//     const content = candidates[0].content;
//     if (!content || !content.parts || content.parts.length === 0) {
//       throw new Error('No content parts in Gemini response');
//     }

//     let generatedImageData = null;
//     let responseText = '';
    
//     for (const part of content.parts) {
//       if (part.inlineData || part.inline_data) {
//         generatedImageData = part.inlineData || part.inline_data;
//       }
//       if (part.text) {
//         responseText += part.text;
//       }
//     }

//     if (!generatedImageData) {
//       throw new Error('No image data found in Gemini response');
//     }

//     const uploadedParts = {};
//     Object.entries(cloudinaryResults).forEach(([partName, result]) => {
//       uploadedParts[partName] = {
//         url: result.secure_url,
//         publicId: result.public_id
//       };
//     });

//     console.log('Successfully generated complete saree!');

//     res.json({
//       success: true,
//       generatedImage: {
//         data: generatedImageData.data,
//         mimeType: generatedImageData.mime_type || generatedImageData.mimeType || 'image/png'
//       },
//       responseText: responseText,
//       message: 'Complete saree generated successfully from all 4 parts!',
//       uploadedParts: uploadedParts,
//       partsProcessed: requiredParts
//     });

//   } catch (error) {
//     console.error('API Error:', error);

//     if (Object.keys(cloudinaryResults).length > 0) {
//       try {
//         const cleanupPromises = Object.values(cloudinaryResults).map(result => 
//           cloudinary.uploader.destroy(result.public_id)
//         );
//         await Promise.all(cleanupPromises);
//         console.log('Cleaned up Cloudinary uploads');
//       } catch (cleanupError) {
//         console.error('Failed to cleanup Cloudinary uploads:', cleanupError);
//       }
//     }

//     let errorMessage = 'Failed to process saree parts';
//     let statusCode = 500;

//     if (error.message.includes('Missing saree parts')) {
//       errorMessage = error.message;
//       statusCode = 400;
//     } else if (error.message.includes('Cloudinary') || error.message.includes('upload')) {
//       errorMessage = 'Failed to upload images to cloud storage';
//       statusCode = 503;
//     } else if (error.message.includes('environment variables')) {
//       errorMessage = 'Server configuration error';
//       statusCode = 500;
//     } else if (error.response) {
//       statusCode = error.response.status;
//       errorMessage = error.response.status === 400 ? 'Invalid request to AI service' :
//                      error.response.status === 429 ? 'Rate limit exceeded - please try again later' :
//                      `AI service error: ${error.response.status}`;
//     }

//     res.status(statusCode).json({ 
//       error: errorMessage,
//       details: error.message,
//       stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
//       uploadedParts: Object.keys(cloudinaryResults)
//     });
//   }
// }

// export const config = {
//   api: {
//     bodyParser: false, // Required for multer
//   },
// };


import { v2 as cloudinary } from 'cloudinary';
import axios from 'axios';
import multer from 'multer';
import { Readable } from 'stream';

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Gemini API configuration
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image-preview:generateContent';

// Multer configuration for memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit per file
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

// Function to upload image to Cloudinary
async function uploadToCloudinary(fileBuffer, sareePart) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'image',
        folder: `saree-parts/${sareePart}`,
        public_id: `${sareePart}-${Date.now()}`,
        format: 'jpg',
        quality: 'auto:good',
        width: 512,
        height: 512,
        crop: 'limit'
      },
      (error, result) => {
        if (error) {
          console.error(`Cloudinary upload error for ${sareePart}:`, error);
          return reject(error);
        }
        console.log(`Upload success for ${sareePart}: ${result.secure_url}`);
        resolve(result);
      }
    );

    Readable.from(fileBuffer).pipe(uploadStream);
  });
}

// Function to upload generated image to Cloudinary
async function uploadGeneratedImageToCloudinary(base64Data, viewType, mimeType) {
  const buffer = Buffer.from(base64Data, 'base64');
  
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'image',
        folder: `generated-sarees/${viewType}`,
        public_id: `saree-${viewType}-${Date.now()}`,
        format: 'jpg',
        quality: 'auto:good'
      },
      (error, result) => {
        if (error) {
          console.error(`Cloudinary upload error for ${viewType}:`, error);
          return reject(error);
        }
        resolve(result.secure_url);
      }
    );

    Readable.from(buffer).pipe(uploadStream);
  });
}

// Function to download image from URL and convert to base64
async function downloadImageAsBase64(imageUrl) {
  try {
    console.log(`Downloading image: ${imageUrl}`);
    const response = await axios.get(imageUrl, {
      responseType: 'arraybuffer',
      timeout: 30000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    const base64Data = Buffer.from(response.data).toString('base64');
    const contentType = response.headers['content-type'] || 'image/jpeg';
    
    console.log(`Image downloaded and converted to base64`);
    return {
      data: base64Data,
      mimeType: contentType
    };
  } catch (error) {
    console.error('Download image error:', error);
    throw new Error(`Failed to download image: ${error.message}`);
  }
}

// Function to generate a single view with Gemini
async function generateSareeView(imageDataResults, viewType) {
 const viewPrompts = {

    front: `Generate a beautiful and photorealistic FRONT VIEW image of the SAME Indian model, standing, and facing forward. The model is elegantly wearing the exact saree and blouse shown in the provided image. Ensure all visual details, including the blouse style, fit, pallu design, and borders, are precisely replicated and perfectly consistent with the reference photo.`,

    back: `Generate a beautiful and photorealistic BACK VIEW image of the SAME Indian model, standing, viewed from behind. The model is elegantly wearing the exact saree and blouse shown in the provided image. Focus on the back draping and ensure the blouse style, fit, pallu design, and all garment details are perfectly consistent with the reference photo.`,

    side: `Generate a beautiful and photorealistic SIDE VIEW image of the SAME Indian model in a graceful side profile pose. The model is elegantly wearing the exact saree and blouse from the provided image. All details of the saree and blouse, including their fit and the pallu design, must remain perfectly consistent with the reference photo.`,

    sitting: `Generate a beautiful and photorealistic FRONT SITTING VIEW image of the SAME Indian model, sitting gracefully and naturally. The model is wearing the exact saree and blouse from the provided image. Critically, ensure the blouse style, fit, pallu design, and all garment details appear **identically consistent** with the standing views from the reference photo, despite the seated posture. The saree should be arranged elegantly around the seated form, maintaining the original look and alignment as much as possible.`
};

  const parts = [
    {
      text: `${viewPrompts[viewType]} I'm providing you with 4 separate parts of a saree:

1. BLOUSE - The fitted upper garment/top part
2. PLEATS - The folded front portion of the saree  
3. PALLU - The decorative end piece that goes over the shoulder
4. SHOULDER - The shoulder draping portion

Please create a cohesive, professional fashion photograph showing all these parts seamlessly combined into one beautiful, traditionally draped saree. Match the colors, patterns, and textures from all 4 parts to create a unified, stunning saree look. Make it look like a high-quality fashion photography shot.

The 4 saree parts are provided below in order:`
    }
  ];

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

  console.log(`Calling Gemini API for ${viewType} view...`);
  const geminiResponse = await axios.post(GEMINI_API_URL, requestPayload, {
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': GEMINI_API_KEY
    },
    timeout: 300000,
    maxBodyLength: 50 * 1024 * 1024,
    maxContentLength: 50 * 1024 * 1024
  });

  console.log(`Gemini API response received for ${viewType} view`);

  const candidates = geminiResponse.data.candidates;
  if (!candidates || candidates.length === 0) {
    throw new Error(`No candidates in Gemini response for ${viewType} view`);
  }

  const content = candidates[0].content;
  if (!content || !content.parts || content.parts.length === 0) {
    throw new Error(`No content parts in Gemini response for ${viewType} view`);
  }

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
    throw new Error(`No image data found in Gemini response for ${viewType} view`);
  }

  return {
    imageData: generatedImageData,
    responseText
  };
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

  const uploadMiddleware = upload.fields([
    { name: 'blouse', maxCount: 1 },
    { name: 'pleats', maxCount: 1 },
    { name: 'pallu', maxCount: 1 },
    { name: 'shoulder', maxCount: 1 }
  ]);

  let cloudinaryResults = {};

  try {
    // Process file uploads with Multer
    await new Promise((resolve, reject) => {
      uploadMiddleware(req, res, (err) => {
        if (err) {
          console.error('Multer error:', err);
          reject(new Error(`File upload error: ${err.message}`));
        } else {
          resolve();
        }
      });
    });

    console.log('Starting API request processing...');
    const files = req.files;

    // Check environment variables
    const missingEnvs = [];
    if (!process.env.CLOUDINARY_CLOUD_NAME) missingEnvs.push('CLOUDINARY_CLOUD_NAME');
    if (!process.env.CLOUDINARY_API_KEY) missingEnvs.push('CLOUDINARY_API_KEY');
    if (!process.env.CLOUDINARY_API_SECRET) missingEnvs.push('CLOUDINARY_API_SECRET');
    if (!process.env.GEMINI_API_KEY) missingEnvs.push('GEMINI_API_KEY');

    if (missingEnvs.length > 0) {
      console.error('Missing environment variables:', missingEnvs);
      return res.status(500).json({ 
        error: 'Server configuration error: Missing environment variables',
        missing: missingEnvs
      });
    }

    // Check if all 4 parts are uploaded
    const requiredParts = ['blouse', 'pleats', 'pallu', 'shoulder'];
    const missingParts = requiredParts.filter(part => !files[part] || files[part].length === 0);

    if (missingParts.length > 0) {
      return res.status(400).json({ 
        error: `Missing saree parts: ${missingParts.join(', ')}. Please upload all 4 parts.`,
        missingParts: missingParts
      });
    }

    console.log('Processing parts:', Object.keys(files));

    // Step 1: Upload all parts to Cloudinary
    console.log('Uploading to Cloudinary...');
    const uploadPromises = requiredParts.map(async (partName) => {
      const file = files[partName][0];
      console.log(`Processing ${partName}: ${file.originalname} (${(file.size / 1024 / 1024).toFixed(2)}MB)`);
      const result = await uploadToCloudinary(file.buffer, partName);
      return { partName, result };
    });

    const uploadResults = await Promise.all(uploadPromises);
    
    uploadResults.forEach(({ partName, result }) => {
      cloudinaryResults[partName] = result;
    });

    console.log('All parts uploaded to Cloudinary');

    // Step 2: Download all images and convert to base64
    console.log('Converting images to base64...');
    const imageDataPromises = uploadResults.map(async ({ partName, result }) => {
      const imageData = await downloadImageAsBase64(result.secure_url);
      return { partName, imageData };
    });

    const imageDataResults = await Promise.all(imageDataPromises);
    console.log('All images converted to base64');

    // Step 3: Generate all 4 views
    const viewTypes = ['front', 'back', 'side', 'sitting'];
    console.log('Generating all 4 saree views...');
    
    const generatedViews = {};
    const generatedUrls = {};
    
    // Generate each view sequentially to avoid rate limits
    for (const viewType of viewTypes) {
      try {
        const viewResult = await generateSareeView(imageDataResults, viewType);
        
        // Upload to Cloudinary
        const cloudinaryUrl = await uploadGeneratedImageToCloudinary(
          viewResult.imageData.data,
          viewType,
          viewResult.imageData.mime_type || viewResult.imageData.mimeType
        );
        
        generatedViews[viewType] = {
          data: viewResult.imageData.data,
          mimeType: viewResult.imageData.mime_type || viewResult.imageData.mimeType,
          responseText: viewResult.responseText
        };
        
        generatedUrls[viewType] = cloudinaryUrl;
        console.log(`${viewType} view generated and uploaded successfully`);
        
        // Add small delay between generations to be respectful to API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
      } catch (error) {
        console.error(`Failed to generate ${viewType} view:`, error);
        // Continue with other views even if one fails
      }
    }

    if (Object.keys(generatedViews).length === 0) {
      throw new Error('Failed to generate any saree views');
    }

    const uploadedParts = {};
    Object.entries(cloudinaryResults).forEach(([partName, result]) => {
      uploadedParts[partName] = {
        url: result.secure_url,
        publicId: result.public_id
      };
    });

    console.log(`Successfully generated ${Object.keys(generatedViews).length} saree views!`);

    res.json({
      success: true,
      generatedViews: generatedViews,
      generatedUrls: generatedUrls,
      message: `Generated ${Object.keys(generatedViews).length} saree views successfully!`,
      uploadedParts: uploadedParts,
      partsProcessed: requiredParts,
      viewsGenerated: Object.keys(generatedViews)
    });

  } catch (error) {
    console.error('API Error:', error);

    if (Object.keys(cloudinaryResults).length > 0) {
      try {
        const cleanupPromises = Object.values(cloudinaryResults).map(result => 
          cloudinary.uploader.destroy(result.public_id)
        );
        await Promise.all(cleanupPromises);
        console.log('Cleaned up Cloudinary uploads');
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
      errorMessage = error.response.status === 400 ? 'Invalid request to AI service' :
                     error.response.status === 429 ? 'Rate limit exceeded - please try again later' :
                     `AI service error: ${error.response.status}`;
    }

    res.status(statusCode).json({ 
      error: errorMessage,
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      uploadedParts: Object.keys(cloudinaryResults)
    });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};