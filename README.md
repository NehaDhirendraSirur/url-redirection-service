# URL Redirection Service (URL Shortener)

A backend service that provides URL shortening functionality by efficiently redirecting short URLs to their original destinations.

## Problem Statement
Long URLs are difficult to share and track. This service generates short, unique URLs and resolves them with low latency while handling expiration and basic analytics.

## Core Responsibilities
- Generate short, unique URL identifiers
- Resolve short codes and perform HTTP redirection
- Handle expired and invalid URLs gracefully
- Track basic usage metrics
- Ensure reliability and scalability under concurrent access

## Scope (MVP)
- Create short URLs with configurable expiry
- Redirect requests using short codes
- Input validation and error handling
- Persistent storage using a relational database

## Non-Goals (Initial Phase)
- Authentication and authorization
- Distributed or microservice architecture
- Advanced threat detection or malware scanning
- UI-heavy frontend

> Although the user-facing feature is URL shortening, the core system is designed as a URL redirection service, focusing on reliability, performance, and clean system design tradeoffs.