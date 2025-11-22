package com.example.parkingpro.parkingg.repository;

import com.example.parkingpro.parkingg.entity.Vehicle;
import com.example.parkingpro.parkingg.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
    List<Vehicle> findByUser(User user);
    Optional<Vehicle> findByVehicleNumber(String vehicleNumber);
    List<Vehicle> findByVehicleType(String vehicleType);
}