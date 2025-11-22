package com.example.parkingpro.parkingg.controller;

import com.example.parkingpro.parkingg.entity.Booking;
import com.example.parkingpro.parkingg.entity.User;
import com.example.parkingpro.parkingg.entity.ParkingSlot;
import com.example.parkingpro.parkingg.service.BookingService;
import com.example.parkingpro.parkingg.service.UserService;
import com.example.parkingpro.parkingg.service.ParkingSlotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {

    @Autowired
    private BookingService bookingService;
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private ParkingSlotService parkingSlotService;

    @GetMapping
    public ResponseEntity<List<Booking>> getBookings(@RequestHeader("User-Role") String role, @RequestHeader("User-Id") Long userId) {
        if ("USER".equals(role)) {
            User user = userService.getUserById(userId).orElse(null);
            if (user == null) return ResponseEntity.notFound().build();
            return ResponseEntity.ok(bookingService.getBookingsByUser(user));
        } else if ("ADMIN".equals(role) || "MANAGER".equals(role)) {
            return ResponseEntity.ok(bookingService.getAllBookings());
        }
        return ResponseEntity.status(403).build();
    }

    @PostMapping
    public ResponseEntity<Booking> createBooking(@RequestBody Map<String, Object> request, @RequestHeader("User-Role") String role, @RequestHeader("User-Id") Long userId) {
        try {
            // Get user
            User user = userService.getUserById(userId).orElse(null);
            if (user == null) return ResponseEntity.badRequest().build();
            
            // Get slot
            Long slotId = Long.valueOf(request.get("slotId").toString());
            ParkingSlot slot = parkingSlotService.getSlotById(slotId).orElse(null);
            if (slot == null || !slot.getIsAvailable()) {
                return ResponseEntity.badRequest().build();
            }
            
            // Create booking
            Booking booking = new Booking();
            booking.setUser(user);
            booking.setParkingSlot(slot);
            booking.setVehicleNumber(request.get("vehicleNumber").toString());
            booking.setStartTime(java.time.LocalDateTime.parse(request.get("startTime").toString()));
            booking.setEndTime(java.time.LocalDateTime.parse(request.get("endTime").toString()));
            booking.setTotalCost(Double.valueOf(request.get("totalCost").toString()));
            booking.setStatus("CONFIRMED");
            
            // Save booking
            Booking savedBooking = bookingService.saveBooking(booking);
            
            // Update slot availability
            slot.setIsAvailable(false);
            parkingSlotService.saveSlot(slot);
            
            return ResponseEntity.ok(savedBooking);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<Booking> cancelBooking(@PathVariable Long id, @RequestHeader("User-Role") String role, @RequestHeader("User-Id") Long userId) {
        Booking booking = bookingService.getBookingById(id).orElse(null);
        if (booking == null) return ResponseEntity.notFound().build();
        
        if ("USER".equals(role) && !booking.getUser().getId().equals(userId)) {
            return ResponseEntity.status(403).build();
        }
        
        // Cancel booking
        booking.setStatus("CANCELLED");
        Booking updatedBooking = bookingService.saveBooking(booking);
        
        // Free up slot
        if (booking.getParkingSlot() != null) {
            ParkingSlot slot = booking.getParkingSlot();
            slot.setIsAvailable(true);
            parkingSlotService.saveSlot(slot);
        }
        
        return ResponseEntity.ok(updatedBooking);
    }
}