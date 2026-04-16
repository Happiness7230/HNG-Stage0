const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors({
  origin: '*'
}));

// Route: GET /api/classify
app.get('/api/classify', async (req, res) => {
  try {
    const { name } = req.query;

    // 1. Validate query param
    if (name === undefined || name === '') {
      return res.status(400).json({
        status: "error",
        message: "Missing or empty name parameter"
      });
    }

    if (typeof name !== 'string') {
      return res.status(422).json({
        status: "error",
        message: "Name must be a string"
      });
    }

    // 2. Call external API
    const response = await axios.get(`https://api.genderize.io`, {
      params: { name }
    });

    const data = response.data;

    // 3. Edge case handling
    if (!data.gender || data.count === 0) {
      return res.status(422).json({
        status: "error",
        message: "No prediction available for the provided name"
      });
    }

    // 4. Extract + process
    const gender = data.gender;
    const probability = data.probability;
    const sample_size = data.count;

    // 5. Confidence logic
    const is_confident =
      probability >= 0.7 && sample_size >= 100;

    // 6. Timestamp (UTC ISO 8601)
    const processed_at = new Date().toISOString();

    // 7. Response
    return res.status(200).json({
      status: "success",
      data: {
        name: data.name,
        gender,
        probability,
        sample_size,
        is_confident,
        processed_at
      }
    });

  } catch (error) {
    console.error(error.message);

    return res.status(502).json({
      status: "error",
      message: "Upstream or server failure"
    });
  }
});

// Start server
module.exports = app;