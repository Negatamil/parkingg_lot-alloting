package com.example.parkingpro.parkingg.service;

import com.example.parkingpro.parkingg.entity.ParkingSlot;
import com.example.parkingpro.parkingg.repository.ParkingSlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ParkingSlotService {
    
    @Autowired
    private ParkingSlotRepository parkingSlotRepository;
    
    public List<ParkingSlot> getAllSlots() {
        return parkingSlotRepository.findAll();
    }
    
    public Optional<ParkingSlot> getSlotById(Long id) {
        return parkingSlotRepository.findById(id);
    }
    
    public List<ParkingSlot> getAvailableSlots() {
        return parkingSlotRepository.findByIsAvailable(true);
    }
    
    public ParkingSlot saveSlot(ParkingSlot slot) {
        return parkingSlotRepository.save(slot);
    }
    
    public void deleteSlot(Long id) {
        parkingSlotRepository.deleteById(id);
    }
}