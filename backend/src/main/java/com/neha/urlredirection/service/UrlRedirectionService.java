package com.neha.urlredirection.service;

import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class UrlRedirectionService {

    private final Map<String, String> urlStore = new ConcurrentHashMap<>();

    public String createShortUrl(String originalUrl) {
        String shortCode = UUID.randomUUID().toString().substring(0, 6);
        urlStore.put(shortCode, originalUrl);
        return shortCode;
    }

    public String getOriginalUrl(String shortCode) {
        return urlStore.get(shortCode);
    }
}