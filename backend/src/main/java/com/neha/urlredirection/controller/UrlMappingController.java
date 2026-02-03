package com.neha.urlredirection.controller;

import com.neha.urlredirection.model.UrlMapping;
import com.neha.urlredirection.service.UrlMappingService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/shorten")
public class UrlMappingController {

    private final UrlMappingService service;

    public UrlMappingController(UrlMappingService service) {
        this.service = service;
    }

    @PostMapping
    public UrlMapping shorten(@RequestParam String url) {
        return service.createShortUrl(url);
    }
}