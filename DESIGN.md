# System Design – URL Redirection Service

## Overview
The system maps short URLs to long URLs and redirects users efficiently while tracking basic analytics.

High-level flow:
Client → API → Database → Redirect

## Architecture
- Monolithic Spring Boot application
- REST-based API
- PostgreSQL as primary datastore

## Key Design Decisions

### URL Short Code Generation
Short codes are generated using Base62 encoding of a database-generated numeric ID.

Reasons:
- Deterministic and collision-free
- No need for collision checks
- Easy to debug and reason about
- Scales well with database sharding strategies

### Redirect Strategy
- HTTP 302 redirect is used
- Prevents aggressive caching
- Allows URLs to expire or change targets

### Expiry Handling
- Each URL has an optional expiry timestamp
- Expired URLs return HTTP 410 (Gone)
- URLs are soft-disabled instead of hard-deleted

### Analytics
- Clicks are tracked separately
- Analytics must never block redirect flow
- Async processing may be introduced later

## Error Handling
- 400 → Invalid input
- 404 → Short code not found
- 410 → URL expired
- 500 → Internal error

## Non-Goals
- No message queues in MVP
- No Redis initially
- No authentication