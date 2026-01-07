# ACCP 2026 Backend API Documentation

Base URL: `http://localhost:8080`

---

## Health & Info

### GET /
Returns API information and available endpoints.

**Response:**
```json
{
  "name": "ACCP 2026 Conference API",
  "description": "Backend API for the 25th Asian Conference on Clinical Pharmacy",
  "theme": "Borderless Pharmacy Practice: The Collaboration for sustainability and Cultural Integration",
  "conference": {
    "dates": "July 10-11, 2026",
    "workshop": "July 9, 2026",
    "venue": "Centara Grand & Bangkok Convention Centre at CentralWorld",
    "city": "Bangkok, Thailand"
  },
  "endpoints": {
    "health": "/health",
    "auth": "/api/auth",
    "abstracts": "/api/abstracts",
    "registrations": "/api/registrations"
  }
}
```

### GET /health
Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-01-15T09:00:00.000Z",
  "service": "ACCP 2026 Backend API",
  "version": "1.0.0"
}
```

---

## Authentication

### POST /api/auth/login
Authenticate user and get JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "message": "Login successful"
}
```

### POST /api/auth/register
Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "affiliation": "University of Bangkok",
  "country": "Thailand"
}
```

**Response:**
```json
{
  "message": "Registration successful",
  "user": {
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

### GET /api/auth/me
Get current authenticated user (requires JWT token).

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "user": {
    "email": "user@example.com",
    "role": "attendee"
  }
}
```

---

## Abstract Submission

### GET /api/abstracts/categories
Get all 8 topic categories for abstract submission.

**Response:**
```json
{
  "categories": [
    { "id": 1, "name": "Clinical Pharmacy", "slug": "clinical_pharmacy" },
    { "id": 2, "name": "Social and Administrative Pharmacy", "slug": "social_administrative_pharmacy" },
    { "id": 3, "name": "Pharmacology and Toxicology", "slug": "pharmacology_toxicology" },
    { "id": 4, "name": "Pharmacoeconomics and Pharmacoepidemiology", "slug": "pharmacoeconomics_pharmacoepidemiology" },
    { "id": 5, "name": "Pharmacy Education", "slug": "pharmacy_education" },
    { "id": 6, "name": "Pharmaceutics and Pharmaceutical Sciences", "slug": "pharmaceutics_pharmaceutical_sciences" },
    { "id": 7, "name": "Medicinal Chemistry", "slug": "medicinal_chemistry" },
    { "id": 8, "name": "Pharmacognosy and Pharmaceutical Biotechnology", "slug": "pharmacognosy_pharmaceutical_biotechnology" }
  ]
}
```

### POST /api/abstracts/submit
Submit a new abstract.

**Request Body:**
```json
{
  "title": "Effect of Clinical Pharmacy Services on Patient Outcomes",
  "authors": "John Doe*, Jane Smith, Bob Johnson",
  "affiliations": "University of Bangkok, Thailand",
  "category": "clinical_pharmacy",
  "abstractType": "oral",
  "keywords": "clinical pharmacy, patient outcomes, medication therapy",
  "abstractText": "Introduction: ... Methods: ... Results: ... Discussion: ...",
  "conflictOfInterest": "None declared"
}
```

**Response:**
```json
{
  "success": true,
  "trackingId": "ACCP26-AB1234",
  "message": "Abstract submitted successfully. A confirmation email will be sent shortly.",
  "abstract": {
    "title": "Effect of Clinical Pharmacy Services...",
    "trackingId": "ACCP26-AB1234",
    "status": "submitted",
    "submittedAt": "2026-02-01T10:30:00.000Z"
  }
}
```

### GET /api/abstracts/:trackingId
Get abstract status by tracking ID.

**Response:**
```json
{
  "trackingId": "ACCP26-AB1234",
  "status": "submitted",
  "message": "Abstract tracking endpoint"
}
```

### GET /api/abstracts/deadlines
Get abstract submission deadlines.

**Response:**
```json
{
  "submissionOpen": "2026-01-15",
  "submissionClose": "2026-03-15",
  "notificationDate": "2026-04-15",
  "isOpen": true
}
```

---

## Registration

### GET /api/registrations/fees
Get all registration fee tiers.

**Response:**
```json
{
  "earlyBird": {
    "startDate": "2026-01-15",
    "endDate": "2026-04-15"
  },
  "regular": {
    "startDate": "2026-04-16",
    "endDate": "2026-07-09"
  },
  "international": {
    "student": { "earlyBird": 250, "regular": 270, "currency": "USD" },
    "professional": { "earlyBird": 385, "regular": 400, "currency": "USD" },
    "workshop": { "price": 70, "currency": "USD" },
    "galaDinner": { "price": 75, "currency": "USD" }
  },
  "thai": {
    "student": { "earlyBird": 4900, "regular": 4900, "currency": "THB" },
    "professional": { "earlyBird": 7900, "regular": 8900, "currency": "THB" },
    "workshop": { "price": 2100, "currency": "THB" },
    "galaDinner": { "price": 2200, "currency": "THB" }
  }
}
```

### POST /api/registrations/register
Register for the conference.

**Request Body:**
```json
{
  "email": "attendee@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "affiliation": "University of Bangkok",
  "country": "Thailand",
  "delegateType": "all_delegate",
  "category": "full_registration",
  "includesWorkshop": true,
  "workshopTopics": ["Clinical Pharmacy Workshop"],
  "includesGalaDinner": true,
  "dietaryRequirements": "Vegetarian",
  "specialNeeds": ""
}
```

**Response:**
```json
{
  "success": true,
  "registrationNumber": "REG26123456",
  "registration": {
    "registrationNumber": "REG26123456",
    "status": "pending",
    "totalAmount": 12200,
    "currency": "THB",
    "isEarlyBird": true,
    "createdAt": "2026-02-15T14:30:00.000Z"
  },
  "payment": {
    "amount": 12200,
    "currency": "THB",
    "message": "Please proceed to payment to confirm your registration."
  }
}
```

### GET /api/registrations/:registrationNumber
Get registration status by registration number.

**Response:**
```json
{
  "registrationNumber": "REG26123456",
  "status": "pending",
  "message": "Registration lookup endpoint"
}
```

### GET /api/registrations/deadlines
Get registration deadlines.

**Response:**
```json
{
  "registrationOpen": "2026-01-15",
  "registrationClose": "2026-07-09",
  "workshopDate": "2026-07-09",
  "conferenceDates": "2026-07-10 - 2026-07-11"
}
```

---

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "error": "Validation failed",
  "details": [
    { "path": ["email"], "message": "Invalid email" }
  ]
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

---

## Enums

### Abstract Types
- `oral` - Oral presentation
- `poster` - Poster presentation
- `e_poster` - Electronic poster

### Registration Categories
- `full_registration` - Full conference access
- `day_registration` - Single day access
- `workshops` - Workshop only

### Delegate Types
- `all_delegate` - Professional/Academician
- `pharmacy_students` - Undergraduate student
