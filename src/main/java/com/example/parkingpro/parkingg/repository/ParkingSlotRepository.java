package com.example.parkingpro.parkingg.repository;

import com.example.parkingpro.parkingg.entity.ParkingSlot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ParkingSlotRepository extends JpaRepository<ParkingSlot, Long> {
    List<ParkingSlot> findByIsAvailable(Boolean isAvailable);
    List<ParkingSlot> findBySlotType(String slotType);
    List<ParkingSlot> findByFloor(Integer floor);
}