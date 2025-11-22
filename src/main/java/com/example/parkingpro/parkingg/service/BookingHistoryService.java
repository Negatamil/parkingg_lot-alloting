package com.example.parkingpro.parkingg.service;

import com.example.parkingpro.parkingg.entity.BookingHistory;
import com.example.parkingpro.parkingg.entity.Booking;
import com.example.parkingpro.parkingg.repository.BookingHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class BookingHistoryService {
    
    @Autowired
    private BookingHistoryRepository bookingHistoryRepository;
    
    public List<BookingHistory> getAllHistories() {
        return bookingHistoryRepository.findAll();
    }
    
    public Optional<BookingHistory> getHistoryById(Long id) {
        return bookingHistoryRepository.findById(id);
    }
    
    public List<BookingHistory> getHistoryByBooking(Booking booking) {
        return bookingHistoryRepository.findByBookingOrderByActionDateDesc(booking);
    }
    
    public List<BookingHistory> getHistoryByAction(String action) {
        return bookingHistoryRepository.findByActionOrderByActionDateDesc(action);
    }
    
    public BookingHistory saveBookingHistory(BookingHistory bookingHistory) {
        return bookingHistoryRepository.save(bookingHistory);
    }
    
    public BookingHistory createHistory(BookingHistory history) {
        return bookingHistoryRepository.save(history);
    }
    
    public BookingHistory updateHistory(Long id, BookingHistory updatedHistory) {
        return bookingHistoryRepository.findById(id).map(history -> {
            history.setAction(updatedHistory.getAction());
            history.setPreviousStatus(updatedHistory.getPreviousStatus());
            history.setNewStatus(updatedHistory.getNewStatus());
            history.setNotes(updatedHistory.getNotes());
            history.setNotes(updatedHistory.getNotes());
            return bookingHistoryRepository.save(history);
        }).orElseThrow(() -> new RuntimeException("History not found"));
    }
    
    public void deleteHistory(Long id) {
        bookingHistoryRepository.deleteById(id);
    }
}