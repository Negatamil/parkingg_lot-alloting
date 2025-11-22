package com.example.parkingpro.parkingg.service;

import com.example.parkingpro.parkingg.entity.Payment;
import com.example.parkingpro.parkingg.entity.Booking;
import com.example.parkingpro.parkingg.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class PaymentService {
    
    @Autowired
    private PaymentRepository paymentRepository;
    
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }
    
    public Optional<Payment> getPaymentById(Long id) {
        return paymentRepository.findById(id);
    }
    
    public Optional<Payment> getPaymentByBooking(Booking booking) {
        return paymentRepository.findByBooking(booking);
    }
    
    public List<Payment> getPaymentsByStatus(String status) {
        return paymentRepository.findByPaymentStatus(status);
    }
    
    public Payment savePayment(Payment payment) {
        return paymentRepository.save(payment);
    }
    
    public Payment createPayment(Payment payment) {
        return paymentRepository.save(payment);
    }
    
    public Payment updatePayment(Long id, Payment updatedPayment) {
        return paymentRepository.findById(id).map(payment -> {
            payment.setAmount(updatedPayment.getAmount());
            payment.setPaymentMethod(updatedPayment.getPaymentMethod());
            payment.setPaymentStatus(updatedPayment.getPaymentStatus());
            payment.setTransactionId(updatedPayment.getTransactionId());
            return paymentRepository.save(payment);
        }).orElseThrow(() -> new RuntimeException("Payment not found"));
    }
    
    public void deletePayment(Long id) {
        paymentRepository.deleteById(id);
    }
}