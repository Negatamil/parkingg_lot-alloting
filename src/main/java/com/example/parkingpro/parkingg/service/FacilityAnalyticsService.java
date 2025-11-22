package com.example.parkingpro.parkingg.service;

import com.example.parkingpro.parkingg.entity.FacilityAnalytics;
import com.example.parkingpro.parkingg.entity.Facility;
import com.example.parkingpro.parkingg.repository.FacilityAnalyticsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class FacilityAnalyticsService {
    
    @Autowired
    private FacilityAnalyticsRepository facilityAnalyticsRepository;
    
    public List<FacilityAnalytics> getAllAnalytics() {
        return facilityAnalyticsRepository.findAll();
    }
    
    public Optional<FacilityAnalytics> getAnalyticsById(Long id) {
        return facilityAnalyticsRepository.findById(id);
    }
    
    public List<FacilityAnalytics> getAnalyticsByFacility(Facility facility) {
        return facilityAnalyticsRepository.findByFacilityOrderByDateDesc(facility);
    }
    
    public Optional<FacilityAnalytics> getAnalyticsByFacilityAndDate(Facility facility, LocalDate date) {
        return facilityAnalyticsRepository.findByFacilityAndDate(facility, date);
    }
    
    public List<FacilityAnalytics> getAnalyticsByDateRange(LocalDate startDate, LocalDate endDate) {
        return facilityAnalyticsRepository.findByDateBetween(startDate, endDate);
    }
    
    public FacilityAnalytics saveAnalytics(FacilityAnalytics analytics) {
        return facilityAnalyticsRepository.save(analytics);
    }
    
    public void deleteAnalytics(Long id) {
        facilityAnalyticsRepository.deleteById(id);
    }
}