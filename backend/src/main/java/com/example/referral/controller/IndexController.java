package com.example.referral.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@RestController
public class IndexController {

    @GetMapping("/")
    public Map<String, String> index() {
        return Map.of(
            "status", "UP",
            "message", "Referral System API is running",
            "documentation", "Please use the frontend or API client to interact with the system",
            "health_check", "/api/health"
        );
    }
}
