package com.neha.urlredirection.controller;

import com.neha.urlredirection.model.UrlMapping;
import com.neha.urlredirection.repository.UrlMappingRepository;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/r")
public class RedirectController {

    private final UrlMappingRepository repository;

    public RedirectController(UrlMappingRepository repository) {
        this.repository = repository;
    }

   @GetMapping("/{shortCode}")
public void redirect(
        @PathVariable String shortCode,
        HttpServletResponse response
) throws IOException {

    UrlMapping mapping = repository.findByShortCode(shortCode)
            .orElseThrow(() -> new RuntimeException("Short URL not found"));

    // ✅ increment click count
    mapping.setClickCount(
            mapping.getClickCount() == null ? 1 : mapping.getClickCount() + 1
    );

    repository.save(mapping); // UPDATE happens here

    response.setStatus(HttpServletResponse.SC_FOUND); // 302
    response.sendRedirect(mapping.getOriginalUrl());
}
}