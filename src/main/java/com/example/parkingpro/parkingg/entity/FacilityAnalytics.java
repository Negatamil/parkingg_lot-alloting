package com.example.parkingpro.parkingg.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "facility_analytics")
public class FacilityAnalytics {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long analyticsId;
    
    @ManyToOne
    @JoinColumn(name = "facility_id", nullable = false)
    private Facility facility;
    
    @Column(nullable = false)
    private LocalDate date;
    
    @Column(nullable = false)
    private Integer totalBookings;
    
    @Column(nullable = false)
    private Double totalRevenue;
    
    @Column(nullable = false)
    private Double occupancyRate;
    
    @Column(nullable = false)
    private Integer peakHourBookings;
    
    @Column(nullable = false)
    private Double averageBookingDuration;

    public FacilityAnalytics() {}

    public FacilityAnalytics(Facility facility, LocalDate date, Integer totalBookings, Double totalRevenue, Double occupancyRate) {
        this.facility = facility;
        this.date = date;
        this.totalBookings = totalBookings;
        this.totalRevenue = totalRevenue;
        this.occupancyRate = occupancyRate;
    }

    // Getters and Setters
    public Long getAnalyticsId() { return analyticsId; }
    public void setAnalyticsId(Long analyticsId) { this.analyticsId = analyticsId; }

    public Facility getFacility() { return facility; }
    public void setFacility(Facility facility) { this.facility = facility; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public Integer getTotalBookings() { return totalBookings; }
    public void setTotalBookings(Integer totalBookings) { this.totalBookings = totalBookings; }

    public Double getTotalRevenue() { return totalRevenue; }
    public void setTotalRevenue(Double totalRevenue) { this.totalRevenue = totalRevenue; }

    public Double getOccupancyRate() { return occupancyRate; }
    public void setOccupancyRate(Double occupancyRate) { this.occupancyRate = occupancyRate; }

    public Integer getPeakHourBookings() { return peakHourBookings; }
    public void setPeakHourBookings(Integer peakHourBookings) { this.peakHourBookings = peakHourBookings; }

    public Double getAverageBookingDuration() { return averageBookingDuration; }
    public void setAverageBookingDuration(Double averageBookingDuration) { this.averageBookingDuration = averageBookingDuration; }
}