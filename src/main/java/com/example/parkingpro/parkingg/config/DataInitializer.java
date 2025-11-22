package com.example.parkingpro.parkingg.config;

import com.example.parkingpro.parkingg.entity.ParkingSlot;
import com.example.parkingpro.parkingg.entity.User;
import com.example.parkingpro.parkingg.repository.ParkingSlotRepository;
import com.example.parkingpro.parkingg.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private ParkingSlotRepository parkingSlotRepository;
    
    @Autowired
    private UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {
        // Don't create default users - use existing database
        
        // Don't create any data - use existing database
        System.out.println("Using existing database with " + parkingSlotRepository.count() + " parking slots");
    }
}