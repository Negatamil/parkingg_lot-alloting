package com.example.parkingpro.parkingg.controller;

import com.example.parkingpro.parkingg.entity.User;
import com.example.parkingpro.parkingg.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> request) {
        try {
            String name = request.get("name");
            String email = request.get("email");
            String password = request.get("password");
            String role = request.get("role");
            
            System.out.println("Registration request: " + request);
            
            // Check if user exists
            if (userRepository.existsByEmail(email)) {
                return ResponseEntity.badRequest().body(Map.of("message", "User already exists"));
            }
            
            // Create user
            User user = new User(email, password, role != null ? role : "USER", name != null ? name : email.split("@")[0]);
            User savedUser = userRepository.save(user);
            
            System.out.println("User registered: " + savedUser.getEmail() + " with role: " + savedUser.getRole());
            
            return ResponseEntity.ok(Map.of("message", "Registration successful"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(Map.of("message", "Registration failed: " + e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");
        
        // Find user
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent() && userOpt.get().getPassword().equals(password)) {
            User user = userOpt.get();
            
            Map<String, Object> response = new HashMap<>();
            Map<String, Object> userResponse = new HashMap<>();
            userResponse.put("id", user.getId());
            userResponse.put("email", user.getEmail());
            userResponse.put("role", user.getRole());
            userResponse.put("name", user.getName());
            
            response.put("token", "jwt-token-" + System.currentTimeMillis());
            response.put("user", userResponse);
            return ResponseEntity.ok(response);
        }
        
        return ResponseEntity.badRequest().body(Map.of("message", "Invalid credentials"));
    }
}