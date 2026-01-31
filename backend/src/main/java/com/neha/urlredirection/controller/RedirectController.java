package com.neha.urlredirection.controller;

import com.neha.urlredirection.service.UrlRedirectionService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RestController
public class RedirectController {

    private final UrlRedirectionService urlRedirectionService;

    public RedirectController(UrlRedirectionService urlRedirectionService) {
        this.urlRedirectionService = urlRedirectionService;
    }

    @GetMapping("/r/{shortCode}")
public ResponseEntity<Void> redirect(@PathVariable String shortCode) {

    String originalUrl = urlRedirectionService.getOriginalUrl(shortCode);

    if (originalUrl == null) {
        return ResponseEntity.notFound().build();
    }

    HttpHeaders headers = new HttpHeaders();
    headers.setLocation(URI.create(originalUrl));

    return new ResponseEntity<>(headers, HttpStatus.FOUND);
}
}