package com.example.parkingpro.parkingg.repository;

import com.example.parkingpro.parkingg.entity.FacilityAnalytics;
import com.example.parkingpro.parkingg.entity.Facility;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface FacilityAnalyticsRepository extends JpaRepository<FacilityAnalytics, Long> {
    List<FacilityAnalytics> findByFacilityOrderByDateDesc(Facility facility);
    Optional<FacilityAnalytics> findByFacilityAndDate(Facility facility, LocalDate date);
    List<FacilityAnalytics> findByDateBetween(LocalDate startDate, LocalDate endDate);
}