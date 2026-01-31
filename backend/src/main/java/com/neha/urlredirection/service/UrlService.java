package com.neha.urlredirection.service;

import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UrlService {

    public String generateShortCode() {
        return UUID.randomUUID().toString().substring(0, 6);
    }
}