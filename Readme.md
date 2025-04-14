# OutFlo-Assignment

A full-stack Campaign Management System with AI-based personalized messaging and optional LinkedIn profile scraping. Built using **Node.js, Express, TypeScript, MongoDB** on the backend and **React, TypeScript** on the frontend.



## 🔗 API Endpoints

### 📦 Campaign Management
| Method | Endpoint           | Description                          |
|--------|--------------------|--------------------------------------|
| GET    | `/campaigns`       | Get all campaigns except `DELETED`   |
| GET    | `/campaigns/:id`   | Get campaign by ID                   |
| POST   | `/campaigns`       | Create a new campaign                |
| PUT    | `/campaigns/:id`   | Update campaign details/status       |
| DELETE | `/campaigns/:id`   | Soft delete (sets status to DELETED) |

### 🤖 Personalized Message
| Method | Endpoint                 | Description                    |
|--------|--------------------------|--------------------------------|
| POST   | `/personalized-message`  | Returns message based on input|

**Example Input:**
```json
{
  "name": "John Doe",
  "job_title": "Software Engineer",
  "company": "TechCorp",
  "location": "San Francisco, CA",
  "summary": "Experienced in AI & ML..."
}
