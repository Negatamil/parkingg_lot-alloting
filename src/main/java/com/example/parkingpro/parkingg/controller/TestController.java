package com.example.parkingpro.parkingg.controller;

import com.example.parkingpro.parkingg.entity.User;
import com.example.parkingpro.parkingg.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/test")
@CrossOrigin(origins = "http://localhost:3000")
public class TestController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userRepository.findAll();
        System.out.println("Total users in database: " + users.size());
        for (User user : users) {
            System.out.println("User: " + user.getEmail() + " | Role: " + user.getRole() + " | Name: " + user.getName());
        }
        return ResponseEntity.ok(users);
    }
}