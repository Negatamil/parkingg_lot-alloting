package com.example.parkingpro.parkingg.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "facilities")
public class Facility {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long facilityId;
    
    @Column(nullable = false)
    private String facilityName;
    
    @Column(nullable = false)
    private String address;
    
    @Column(nullable = false)
    private Integer totalSlots;
    
    @Column(nullable = false)
    private Integer availableSlots;
    
    @Column(nullable = false)
    private String operatingHours;
    
    @Column(nullable = false)
    private String contactInfo;

    public Facility() {}

    public Facility(String facilityName, String address, Integer totalSlots, String operatingHours, String contactInfo) {
        this.facilityName = facilityName;
        this.address = address;
        this.totalSlots = totalSlots;
        this.availableSlots = totalSlots;
        this.operatingHours = operatingHours;
        this.contactInfo = contactInfo;
    }

    // Getters and Setters
    public Long getFacilityId() { return facilityId; }
    public void setFacilityId(Long facilityId) { this.facilityId = facilityId; }

    public String getFacilityName() { return facilityName; }
    public void setFacilityName(String facilityName) { this.facilityName = facilityName; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public Integer getTotalSlots() { return totalSlots; }
    public void setTotalSlots(Integer totalSlots) { this.totalSlots = totalSlots; }

    public Integer getAvailableSlots() { return availableSlots; }
    public void setAvailableSlots(Integer availableSlots) { this.availableSlots = availableSlots; }

    public String getOperatingHours() { return operatingHours; }
    public void setOperatingHours(String operatingHours) { this.operatingHours = operatingHours; }

    public String getContactInfo() { return contactInfo; }
    public void setContactInfo(String contactInfo) { this.contactInfo = contactInfo; }
}