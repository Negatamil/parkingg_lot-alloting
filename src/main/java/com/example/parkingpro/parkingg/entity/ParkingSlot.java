package com.example.parkingpro.parkingg.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "parking_slots")
public class ParkingSlot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long slotId;
    
    @Column(nullable = false)
    private String slotNumber;
    
    @Column(nullable = false)
    private String slotType;
    
    @Column(nullable = false)
    private Integer floor;
    
    @Column(nullable = false)
    private Double hourlyRate;
    
    @Column(nullable = false)
    private Boolean isAvailable = true;
    
    @Column(nullable = false)
    private String location;

    public ParkingSlot() {}

    public ParkingSlot(String slotNumber, String slotType, Integer floor, Double hourlyRate, String location) {
        this.slotNumber = slotNumber;
        this.slotType = slotType;
        this.floor = floor;
        this.hourlyRate = hourlyRate;
        this.location = location;
    }

    // Getters and Setters
    public Long getSlotId() { return slotId; }
    public void setSlotId(Long slotId) { this.slotId = slotId; }

    public String getSlotNumber() { return slotNumber; }
    public void setSlotNumber(String slotNumber) { this.slotNumber = slotNumber; }

    public String getSlotType() { return slotType; }
    public void setSlotType(String slotType) { this.slotType = slotType; }

    public Integer getFloor() { return floor; }
    public void setFloor(Integer floor) { this.floor = floor; }

    public Double getHourlyRate() { return hourlyRate; }
    public void setHourlyRate(Double hourlyRate) { this.hourlyRate = hourlyRate; }

    public Boolean getIsAvailable() { return isAvailable; }
    public void setIsAvailable(Boolean isAvailable) { this.isAvailable = isAvailable; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
}