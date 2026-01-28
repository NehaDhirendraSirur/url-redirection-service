# API Contracts – URL Redirection Service

This document defines the external API contracts for the URL Redirection Service.

## 1. Create Short URL

Creates a short URL for a given long URL with optional expiry.

### Endpoint
POST /api/urls

### Request Body
```json
{
  "longUrl": "https://example.com/very/long/path",
  "expiryDays": 30
}