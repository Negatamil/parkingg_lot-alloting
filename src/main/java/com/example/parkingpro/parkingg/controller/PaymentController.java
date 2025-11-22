package com.example.parkingpro.parkingg.controller;

import com.example.parkingpro.parkingg.entity.Payment;
import com.example.parkingpro.parkingg.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    // ADMIN/MANAGER - Get all payments, USER - Forbidden
    @GetMapping
    public ResponseEntity<List<Payment>> getAllPayments(@RequestHeader("User-Role") String role) {
        if ("ADMIN".equals(role) || "MANAGER".equals(role)) {
            return ResponseEntity.ok(paymentService.getAllPayments());
        }
        return ResponseEntity.status(403).build();
    }

    // USER - Get own payment, ADMIN/MANAGER - Get any payment
    @GetMapping("/{id}")
    public ResponseEntity<Payment> getPaymentById(@PathVariable Long id, @RequestHeader("User-Role") String role, @RequestHeader("User-Id") Long userId) {
        Payment payment = paymentService.getPaymentById(id).orElse(null);
        if (payment == null) return ResponseEntity.notFound().build();
        
        if ("USER".equals(role) && !payment.getBooking().getUser().getId().equals(userId)) {
            return ResponseEntity.status(403).build();
        }
        
        return ResponseEntity.ok(payment);
    }

    // USER - Create own payment, ADMIN - Create any payment
    @PostMapping
    public ResponseEntity<Payment> createPayment(@RequestBody Payment payment, @RequestHeader("User-Role") String role, @RequestHeader("User-Id") Long userId) {
        if ("USER".equals(role) && !payment.getBooking().getUser().getId().equals(userId)) {
            return ResponseEntity.status(403).build();
        } else if (!"ADMIN".equals(role) && !"USER".equals(role)) {
            return ResponseEntity.status(403).build();
        }
        
        return ResponseEntity.ok(paymentService.savePayment(payment));
    }

    // ADMIN ONLY - Update payment status
    @PutMapping("/{id}")
    public ResponseEntity<Payment> updatePayment(@PathVariable Long id, @RequestBody Payment payment, @RequestHeader("User-Role") String role) {
        if (!"ADMIN".equals(role)) {
            return ResponseEntity.status(403).build();
        }
        payment.setPaymentId(id);
        return ResponseEntity.ok(paymentService.savePayment(payment));
    }
}