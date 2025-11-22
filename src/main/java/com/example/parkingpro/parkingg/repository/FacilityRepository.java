package com.example.parkingpro.parkingg.repository;

import com.example.parkingpro.parkingg.entity.Facility;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FacilityRepository extends JpaRepository<Facility, Long> {
    List<Facility> findByFacilityNameContaining(String name);
    List<Facility> findByAddressContaining(String address);
}