package com.neha.urlredirection.controller;

import com.neha.urlredirection.dto.CreateUrlRequest;
import com.neha.urlredirection.dto.CreateUrlResponse;
import com.neha.urlredirection.service.UrlService;
import org.springframework.web.bind.annotation.*;
import com.neha.urlredirection.service.UrlRedirectionService;

@RestController
@RequestMapping("/api/v1/urls")
public class UrlController {

    private final UrlRedirectionService urlRedirectionService;

    public UrlController(UrlRedirectionService urlRedirectionService) {
        this.urlRedirectionService = urlRedirectionService;
    }

    @PostMapping
    public CreateUrlResponse createShortUrl(@RequestBody CreateUrlRequest request) {
        String shortCode = urlRedirectionService.createShortUrl(request.getOriginalUrl());
        return new CreateUrlResponse("http://localhost:8080/r/" + shortCode);
    }
}
