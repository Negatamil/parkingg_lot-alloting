package com.example.parkingpro.parkingg.service;

import com.example.parkingpro.parkingg.entity.Vehicle;
import com.example.parkingpro.parkingg.entity.User;
import com.example.parkingpro.parkingg.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class VehicleService {
    
    @Autowired
    private VehicleRepository vehicleRepository;
    
    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }
    
    public Optional<Vehicle> getVehicleById(Long id) {
        return vehicleRepository.findById(id);
    }
    
    public List<Vehicle> getVehiclesByUser(User user) {
        return vehicleRepository.findByUser(user);
    }
    
    public Optional<Vehicle> getVehicleByNumber(String vehicleNumber) {
        return vehicleRepository.findByVehicleNumber(vehicleNumber);
    }
    
    public List<Vehicle> getVehiclesByType(String type) {
        return vehicleRepository.findByVehicleType(type);
    }
    
    public Vehicle saveVehicle(Vehicle vehicle) {
        return vehicleRepository.save(vehicle);
    }
    
    public void deleteVehicle(Long id) {
        vehicleRepository.deleteById(id);
    }
}