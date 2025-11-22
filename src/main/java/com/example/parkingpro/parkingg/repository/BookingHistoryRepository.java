package com.example.parkingpro.parkingg.repository;

import com.example.parkingpro.parkingg.entity.BookingHistory;
import com.example.parkingpro.parkingg.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BookingHistoryRepository extends JpaRepository<BookingHistory, Long> {
    List<BookingHistory> findByBookingOrderByActionDateDesc(Booking booking);
    List<BookingHistory> findByActionOrderByActionDateDesc(String action);
}