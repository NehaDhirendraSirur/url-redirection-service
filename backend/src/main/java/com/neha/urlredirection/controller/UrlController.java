package com.neha.urlredirection.controller;

import com.neha.urlredirection.dto.CreateUrlRequest;
import com.neha.urlredirection.dto.CreateUrlResponse;
import com.neha.urlredirection.model.UrlMapping;
import com.neha.urlredirection.service.UrlMappingService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/urls")
public class UrlController {

    private final UrlMappingService service;

    @Value("${app.base-url}")
    private String baseUrl;

    public UrlController(UrlMappingService service) {
        this.service = service;
    }

    @PostMapping
    public CreateUrlResponse createShortUrl(
            @RequestBody CreateUrlRequest request) {

        UrlMapping mapping =
                service.createShortUrl(request.getOriginalUrl());

        return new CreateUrlResponse(
                baseUrl + "/r/" + mapping.getShortCode()
        );
    }
}