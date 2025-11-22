package com.example.parkingpro.parkingg.repository;

import com.example.parkingpro.parkingg.entity.Booking;
import com.example.parkingpro.parkingg.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUser(User user);
    List<Booking> findByStatus(String status);

}