// api/tryon.js
export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { modelImage, garmentImage } = req.body;
  
  if (!modelImage || !garmentImage) {
    return res.status(400).json({ 
      error: "Both modelImage and garmentImage URLs are required." 
    });
  }

  const apiKey = process.env.FASHN_API_KEY || "fa-jCmx621bg3ye-0kZFcMHh0PgG3YWC38Pl2zbl";

  try {
    console.log("Starting try-on request...");

    // Import axios dynamically
    const axios = (await import('axios')).default;
    
    const FASHN_API_URL = "https://api.fashn.ai/v1";

    // Step 1: Start the try-on process
    const runResponse = await axios.post(
      `${FASHN_API_URL}/run`,
      {
        model_name: "tryon-v1.6",
        inputs: { 
          model_image: modelImage, 
          garment_image: garmentImage 
        },
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        timeout: 30000,
      }
    );

    const predictionId = runResponse.data.id;
    console.log("Prediction ID:", predictionId);

    // Step 2: Poll for completion
    for (let i = 0; i < 10; i++) {
      console.log(`Polling attempt ${i + 1}/10...`);
      
      const statusResponse = await axios.get(
        `${FASHN_API_URL}/status/${predictionId}`,
        { 
          headers: { 
            Authorization: `Bearer ${apiKey}` 
          },
          timeout: 15000,
        }
      );

      const statusData = statusResponse.data;

      if (statusData.status === "completed") {
        return res.status(200).json({ output: statusData.output });
      }

      if (statusData.status === "failed") {
        return res.status(500).json({ 
          error: statusData.error || "Try-on processing failed." 
        });
      }

      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    return res.status(504).json({ error: "Try-on request timed out." });

  } catch (err) {
    console.error("TryOn error:", err);
    
    if (err.response) {
      return res.status(500).json({ 
        error: err.response.data?.message || "API request failed" 
      });
    } else {
      return res.status(500).json({ 
        error: "Something went wrong" 
      });
    }
  }
};

const FASHN_API_URL = "https://api.fashn.ai/v1";

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { modelImage, garmentImage } = req.body;
  
  if (!modelImage || !garmentImage) {
    return res.status(400).json({ 
      error: "Both modelImage and garmentImage URLs are required." 
    });
  }

  const apiKey = process.env.FASHN_API_KEY || "fa-jCmx621bg3ye-0kZFcMHh0PgG3YWC38Pl2zbl";

  try {
    console.log("Starting try-on request...");

    // Step 1: Start the try-on process
    const runResponse = await axios.post(
      `${FASHN_API_URL}/run`,
      {
        model_name: "tryon-v1.6",
        inputs: { 
          model_image: modelImage, 
          garment_image: garmentImage 
        },
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        timeout: 30000,
      }
    );

    const predictionId = runResponse.data.id;
    console.log("Prediction ID:", predictionId);

    // Step 2: Poll for completion
    for (let i = 0; i < 10; i++) {
      console.log(`Polling attempt ${i + 1}/10...`);
      
      const statusResponse = await axios.get(
        `${FASHN_API_URL}/status/${predictionId}`,
        { 
          headers: { 
            Authorization: `Bearer ${apiKey}` 
          },
          timeout: 15000,
        }
      );

      const statusData = statusResponse.data;

      if (statusData.status === "completed") {
        return res.status(200).json({ output: statusData.output });
      }

      if (statusData.status === "failed") {
        return res.status(500).json({ 
          error: statusData.error || "Try-on processing failed." 
        });
      }

      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    return res.status(504).json({ error: "Try-on request timed out." });

  } catch (err) {
    console.error("TryOn error:", err);
    
    if (err.response) {
      return res.status(500).json({ 
        error: err.response.data?.message || "API request failed" 
      });
    } else {
      return res.status(500).json({ 
        error: "Something went wrong" 
      });
    }
  }
};