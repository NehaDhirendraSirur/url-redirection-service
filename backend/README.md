# URL Redirection Service – Backend

## Overview

Spring Boot backend for a URL shortener that supports URL creation, redirection, validation, and basic statistics tracking.

---

## Tech Stack

- Java 17
- Spring Boot
- Spring Data JPA
- PostgreSQL
- Maven

---

## Features

- Create short URLs
- Redirect short URL to original URL
- Input validation (URL, expiry, duplicates)
- Global exception handling using `@ControllerAdvice`
- URL access statistics (click count)
- Refactored and clean service layer

---

## API Endpoints

| Method | Endpoint                      | Description              |
| ------ | ----------------------------- | ------------------------ |
| POST   | `/api/urls`                   | Create short URL         |
| GET    | `/{shortCode}`                | Redirect to original URL |
| GET    | `/api/urls/{shortCode}/stats` | Fetch URL statistics     |

---

## Configuration

Update database configuration in `application.yml`:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/url_redirection
    username: postgres
    password: postgres
```
