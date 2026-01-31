package com.neha.urlredirection.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StatusController {

    @GetMapping("/status")
    public String serviceStatus() {
        return "URL Redirection Service is up and running";
    }
}