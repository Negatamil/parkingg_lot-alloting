package com.example.parkingpro.parkingg.repository;

import com.example.parkingpro.parkingg.entity.Payment;
import com.example.parkingpro.parkingg.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    Optional<Payment> findByBooking(Booking booking);
    List<Payment> findByPaymentStatus(String paymentStatus);
}