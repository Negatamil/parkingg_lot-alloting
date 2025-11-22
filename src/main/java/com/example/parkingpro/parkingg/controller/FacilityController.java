package com.example.parkingpro.parkingg.controller;

import com.example.parkingpro.parkingg.entity.Facility;
import com.example.parkingpro.parkingg.service.FacilityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/facilities")
@CrossOrigin(origins = "http://localhost:3000")
public class FacilityController {

    @Autowired
    private FacilityService facilityService;

    // ALL ROLES - View facilities
    @GetMapping
    public ResponseEntity<List<Facility>> getAllFacilities() {
        return ResponseEntity.ok(facilityService.getAllFacilities());
    }

    // ALL ROLES - Get facility by ID
    @GetMapping("/{id}")
    public ResponseEntity<Facility> getFacilityById(@PathVariable Long id) {
        return facilityService.getFacilityById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ADMIN/MANAGER - Create facility
    @PostMapping
    public ResponseEntity<Facility> createFacility(@RequestBody Facility facility, @RequestHeader("User-Role") String role) {
        if (!"ADMIN".equals(role) && !"MANAGER".equals(role)) {
            return ResponseEntity.status(403).build();
        }
        return ResponseEntity.ok(facilityService.saveFacility(facility));
    }

    // ADMIN/MANAGER - Update facility
    @PutMapping("/{id}")
    public ResponseEntity<Facility> updateFacility(@PathVariable Long id, @RequestBody Facility facility, @RequestHeader("User-Role") String role) {
        if (!"ADMIN".equals(role) && !"MANAGER".equals(role)) {
            return ResponseEntity.status(403).build();
        }
        facility.setFacilityId(id);
        return ResponseEntity.ok(facilityService.saveFacility(facility));
    }

    // ADMIN ONLY - Delete facility
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFacility(@PathVariable Long id, @RequestHeader("User-Role") String role) {
        if (!"ADMIN".equals(role)) {
            return ResponseEntity.status(403).build();
        }
        facilityService.deleteFacility(id);
        return ResponseEntity.ok().build();
    }
}