package com.example.parkingpro.parkingg.controller;

import com.example.parkingpro.parkingg.entity.ParkingSlot;
import com.example.parkingpro.parkingg.service.ParkingSlotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/slots")
@CrossOrigin(origins = "http://localhost:3000")
public class SlotController {

    @Autowired
    private ParkingSlotService parkingSlotService;

    // ALL ROLES - View available slots
    @GetMapping
    public ResponseEntity<List<ParkingSlot>> getAllSlots() {
        return ResponseEntity.ok(parkingSlotService.getAvailableSlots());
    }

    // ALL ROLES - Get slot by ID
    @GetMapping("/{id}")
    public ResponseEntity<ParkingSlot> getSlotById(@PathVariable Long id) {
        return parkingSlotService.getSlotById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ParkingSlot> createSlot(@RequestBody ParkingSlot slot) {
        return ResponseEntity.ok(parkingSlotService.saveSlot(slot));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ParkingSlot> updateSlot(@PathVariable Long id, @RequestBody ParkingSlot slot) {
        slot.setSlotId(id);
        return ResponseEntity.ok(parkingSlotService.saveSlot(slot));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSlot(@PathVariable Long id) {
        parkingSlotService.deleteSlot(id);
        return ResponseEntity.noContent().build();
    }
}