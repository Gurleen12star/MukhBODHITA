# MukhBODHITA REST API Documentation

## Base URL

```
http://localhost:3001/api
```

For production: `https://your-deployed-domain.com/api`

---

## Authentication

MukhBODHITA uses **JWT Bearer Token** authentication.

Include the token in all protected requests:

```
Authorization: Bearer <your_jwt_token>
```

Tokens are valid for **7 days**. Obtain a token via `/api/login` or `/api/register`.

---

## Endpoints

### Public

#### `GET /api/health`

Server health check. No authentication required.

**Response 200:**
```json
{
  "status": "ok",
  "version": "1.0.0",
  "db": "/path/to/mukhbodhita.db"
}
```

---

#### `POST /api/register`

Create a new user account.

**Request Body:**
```json
{
  "name":      "Priya Sharma",         // required
  "phone":     "+919876543210",        // required, must be unique
  "email":     "priya@example.com",   // optional
  "role":      "asha",                // required: "asha" | "home" | "hospital"
  "worker_id": "ASHA-RJ-0042",        // optional, must be unique
  "state":     "Rajasthan",           // optional
  "password":  "secure123"            // required, min 6 characters
}
```

**Response 201:**
```json
{
  "message": "Account created successfully",
  "token": "<jwt>",
  "user": {
    "id": 2, "name": "Priya Sharma", "phone": "+919876543210",
    "role": "asha", "worker_id": "ASHA-RJ-0042", "state": "Rajasthan",
    "is_admin": 0, "created_at": "2026-10-28T00:00:00"
  }
}
```

**Error Responses:**
| Status | Error |
|---|---|
| 400 | Missing required fields |
| 400 | Password too short (< 6 chars) |
| 400 | Invalid role value |
| 409 | Phone number already registered |
| 409 | Worker ID already registered |

---

#### `POST /api/login`

Authenticate and receive a JWT token.

**Request Body:**
```json
{
  "identifier": "ASHA-RJ-0042",  // phone, worker_id, or email
  "password":   "secure123"
}
```

**Response 200:**
```json
{
  "message": "Login successful",
  "token": "<jwt>",
  "user": { ... }
}
```

**Error Responses:**
| Status | Error |
|---|---|
| 400 | Missing identifier or password |
| 401 | Invalid credentials |

---

### Protected (Require Authorization Header)

#### `GET /api/me`

Get the authenticated user's profile.

**Response 200:**
```json
{
  "user": {
    "id": 1, "name": "Demo ASHA Worker", "phone": "+919876543210",
    "role": "asha", "worker_id": "ASHA-DEMO-001", "is_admin": 1,
    "created_at": "2026-10-01T00:00:00", "last_login": "2026-10-28T07:00:00"
  }
}
```

---

#### `GET /api/users` *(admin only)*

List all registered users.

**Response 200:**
```json
{
  "users": [
    { "id": 1, "name": "Demo ASHA Worker", "role": "asha", ... },
    { "id": 2, "name": "Priya Sharma", "role": "asha", ... }
  ]
}
```

---

#### `POST /api/screening`

Save a new screening record.

**Request Body:**
```json
{
  "sample_type":    "breath_voc",           // required
  "voc_ppm":        3.28,                   // required (float)
  "bio_kohm":       14.2,                   // required (float)
  "temp_c":         32.8,                   // required (float)
  "wellness_score": 23,                     // required (int, 0–100)
  "verdict":        "MALIGNANT_INDICATORS", // required
  "ai_notes":       "Elevated VOC S1",      // optional
  "location":       "Jaipur, Rajasthan"     // optional
}
```

**Verdict values:** `BENIGN` | `MALIGNANT_INDICATORS` | `INCONCLUSIVE`

**Response 201:**
```json
{
  "message": "Screening saved",
  "screening_id": 42
}
```

---

#### `GET /api/screenings`

Get the authenticated user's screening history (last 100 records).

**Response 200:**
```json
{
  "screenings": [
    {
      "id": 42, "user_id": 1, "sample_type": "breath_voc",
      "voc_ppm": 3.28, "bio_kohm": 14.2, "temp_c": 32.8,
      "wellness_score": 23, "verdict": "MALIGNANT_INDICATORS",
      "ai_notes": "Elevated VOC S1", "location": "Jaipur, Rajasthan",
      "screened_at": "2026-10-28T07:30:00"
    }
  ]
}
```

---

#### `DELETE /api/screening/:id`

Delete a screening record. User may only delete their own records.

**Response 200:**
```json
{ "message": "Screening deleted successfully" }
```

**Error Responses:**
| Status | Error |
|---|---|
| 404 | Record not found or unauthorized |

---

## Error Response Format

All error responses follow this format:
```json
{
  "error": "Human-readable error message"
}
```

## Rate Limiting

No rate limiting is implemented in the current development version. Production deployments should add rate limiting via `express-rate-limit`.
