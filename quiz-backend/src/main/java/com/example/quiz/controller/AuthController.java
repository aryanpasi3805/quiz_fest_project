package com.example.quiz.controller;

import com.example.quiz.dto.LoginRequest;
import com.example.quiz.dto.LoginResponse;
import com.example.quiz.model.User;
import com.example.quiz.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;
    public AuthController(AuthService authService) { this.authService = authService; }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        return authService.login(req.getUsername(), req.getPassword())
                .map(user -> ResponseEntity.ok(new LoginResponse(user.getToken())))
                .orElseGet(() -> ResponseEntity.status(401).body("Invalid credentials"));
    }
}
