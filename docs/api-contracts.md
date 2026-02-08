' API Contracts – URL Redirection Service

' Base URL: http://localhost:8080

' --------------------------------------------------

' Create Short URL
' POST /api/v1/urls

' Request:
' {
'   "originalUrl": "https://www.google.com"
' }

' Response:
' {
'   "shortUrl": "http://localhost:8080/r/abc123"
' }

' --------------------------------------------------

' Redirect Short URL
' GET /r/{shortCode}

' Behavior:
' Redirects to original URL

' Responses:
' 302 -> Redirect success
' 404 -> Short URL not found
' 410 -> Short URL expired

' Example:
' GET http://localhost:8080/r/abc123

' --------------------------------------------------

' URL Statistics
' GET /api/v1/urls/{shortCode}/stats

' Response:
' {
'   "originalUrl": "https://google.com",
'   "shortCode": "abc123",
'   "clickCount": 3,
'   "createdAt": "2026-02-04T00:18:46.091937",
'   "expiresAt": "2026-03-06T00:18:46.072581",
'   "expired": false
' }

' --------------------------------------------------

' Error Response Format
' {
'   "status": 410,
'   "error": "Gone",
'   "message": "Short URL has expired",
'   "timestamp": "2026-02-04T23:55:09.4444187"
' }

' --------------------------------------------------

' System Behavior

' - Short code generation is unique
' - Click count auto-increments on redirect
' - Expiry is auto-set on creation
' - Expired links return HTTP 410
' - Invalid links return HTTP 404
' - Validation enforced on input
' - Centralized exception handling
