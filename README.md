# 📄 Backend Wizards — Stage 0  
## API Integration & Data Processing Assessment

This project implements a REST API endpoint that integrates with the Genderize API to classify names by gender and return a processed, structured response.

---

# 🚀 Live Endpoint
https://api.genderize.io?name={name}

### Example:https://your-vercel-url.vercel.app/api/classify?name=john


# 📦 Tech Stack

- Node.js
- Express.js
- Axios (HTTP requests)
- CORS
- (Optional) Rate Limiting Middleware
- (Optional) In-memory Caching

---

# 🔗 External API Used

---

# ✅ Features Implemented

- External API integration
- Data extraction and transformation
- Confidence evaluation logic
- Error handling (400, 422, 502)
- Edge case handling
- Dynamic timestamp generation (UTC, ISO 8601)
- CORS enabled (`Access-Control-Allow-Origin: *`)
- Handles multiple requests efficiently
- Optional:
  - Rate limiting
  - In-memory caching
  - Logging middleware

---

# 📥 Request

## Endpoint
GET /api/classify


## Query Parameters

| Parameter | Type   | Required | Description |
|----------|--------|----------|-------------|
| name     | string | Yes      | Name to classify |

### Example
GET /api/classify?name=john


---

# 📤 Success Response (200 OK)

```json
      {
        "status": "success",
        "data": {
          "name": "john",
          "gender": "male",
          "probability": 0.99,
          "sample_size": 1234,
          "is_confident": true,
          "processed_at": "2026-04-16T10:00:00Z"
        }
      }
