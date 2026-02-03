package com.neha.urlredirection.service;

import com.neha.urlredirection.model.UrlMapping;
import com.neha.urlredirection.repository.UrlMappingRepository;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UrlMappingService {

    private final UrlMappingRepository repository;

    public UrlMappingService(UrlMappingRepository repository) {
        this.repository = repository;
    }

    public UrlMapping createShortUrl(String originalUrl) {
        UrlMapping mapping = new UrlMapping();
        mapping.setOriginalUrl(originalUrl);
        mapping.setShortCode(generateUniqueShortCode());
        mapping.setClickCount(0);

        return repository.save(mapping);
    }

    public UrlMapping getAndIncrementClickCount(String shortCode) {
        UrlMapping mapping = repository.findByShortCode(shortCode)
                .orElseThrow(() -> new RuntimeException("Short URL not found"));

        // increment
        mapping.setClickCount(mapping.getClickCount() + 1);

        // save updated count
        return repository.save(mapping);
    }

    private String generateUniqueShortCode() {
        String code;
        do {
            code = UUID.randomUUID().toString().substring(0, 6);
        } while (repository.findByShortCode(code).isPresent());
        return code;
    }
}