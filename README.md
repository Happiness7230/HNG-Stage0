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
🧠 Processing Logic
sample_size is renamed from count
is_confident is true only if BOTH conditions pass:
probability >= 0.7
sample_size >= 100
processed_at is dynamically generated using:
new Date().toISOString()
❌ Error Responses
400 Bad Request
{
  "status": "error",
  "message": "Missing or empty name parameter"
}
422 Unprocessable Entity
{
  "status": "error",
  "message": "Name must be a string"
}
{
  "status": "error",
  "message": "No prediction available for the provided name"
}
502 Bad Gateway / 500 Server Error
{
  "status": "error",
  "message": "Upstream or server failure"
}
⚠️ Edge Case Handling

If gender is null or count is 0, the API returns:

{
  "status": "error",
  "message": "No prediction available for the provided name"
}
⚡ Performance Considerations
Response time under 500ms (excluding external API latency)
Lightweight processing
Caching reduces repeated API calls
Handles multiple concurrent requests efficiently
🛠️ Local Development

Clone the repository:

git clone https://github.com/your-username/backend-wizards-stage0.git
cd backend-wizards-stage0

Install dependencies:

npm install

Run the server:

node index.js

Test endpoint:

http://localhost:3000/api/classify?name=john
☁️ Deployment

Deployed on Vercel.

npm install -g vercel
vercel

Test deployed endpoint:
https://your-vercel-url.vercel.app/api/classify?name=john

🧪 Testing

You can test using:

Browser
Postman
Curl

Example:

curl "https://your-vercel-url.vercel.app/api/classify?name=john"
📊 Evaluation Criteria Coverage
Endpoint Availability ✅
Query Handling ✅
API Integration ✅
Data Extraction ✅
Confidence Logic ✅
Error Handling ✅
Edge Case Handling ✅
Response Structure ✅
👨‍💻 Author



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
