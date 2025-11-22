package com.example.parkingpro.parkingg.service;

import com.example.parkingpro.parkingg.entity.Facility;
import com.example.parkingpro.parkingg.repository.FacilityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class FacilityService {
    
    @Autowired
    private FacilityRepository facilityRepository;
    
    public List<Facility> getAllFacilities() {
        return facilityRepository.findAll();
    }
    
    public Optional<Facility> getFacilityById(Long id) {
        return facilityRepository.findById(id);
    }
    
    public List<Facility> getFacilitiesByName(String name) {
        return facilityRepository.findByFacilityNameContaining(name);
    }
    
    public List<Facility> getFacilitiesByAddress(String address) {
        return facilityRepository.findByAddressContaining(address);
    }
    
    public Facility saveFacility(Facility facility) {
        return facilityRepository.save(facility);
    }
    
    public void deleteFacility(Long id) {
        facilityRepository.deleteById(id);
    }
}