package com.example.parkingpro.parkingg.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "vehicles")
public class Vehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long vehicleId;
    
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @Column(unique = true, nullable = false)
    private String vehicleNumber;
    
    @Column(nullable = false)
    private String vehicleType;
    
    @Column(nullable = false)
    private String model;
    
    @Column(nullable = false)
    private String color;

    public Vehicle() {}

    public Vehicle(User user, String vehicleNumber, String vehicleType, String model, String color) {
        this.user = user;
        this.vehicleNumber = vehicleNumber;
        this.vehicleType = vehicleType;
        this.model = model;
        this.color = color;
    }

    // Getters and Setters
    public Long getVehicleId() { return vehicleId; }
    public void setVehicleId(Long vehicleId) { this.vehicleId = vehicleId; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getVehicleNumber() { return vehicleNumber; }
    public void setVehicleNumber(String vehicleNumber) { this.vehicleNumber = vehicleNumber; }

    public String getVehicleType() { return vehicleType; }
    public void setVehicleType(String vehicleType) { this.vehicleType = vehicleType; }

    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }

    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }
}