package com.example.parkingpro.parkingg.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "booking_history")
public class BookingHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long historyId;
    
    @ManyToOne
    @JoinColumn(name = "booking_id", nullable = false)
    private Booking booking;
    
    @Column(nullable = false)
    private String action;
    
    @Column(nullable = false)
    private String previousStatus;
    
    @Column(nullable = false)
    private String newStatus;
    
    @Column(nullable = false)
    private LocalDateTime actionDate = LocalDateTime.now();
    
    @Column
    private String notes;

    public BookingHistory() {}

    public BookingHistory(Booking booking, String action, String previousStatus, String newStatus, String notes) {
        this.booking = booking;
        this.action = action;
        this.previousStatus = previousStatus;
        this.newStatus = newStatus;
        this.notes = notes;
    }

    // Getters and Setters
    public Long getHistoryId() { return historyId; }
    public void setHistoryId(Long historyId) { this.historyId = historyId; }

    public Booking getBooking() { return booking; }
    public void setBooking(Booking booking) { this.booking = booking; }

    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }

    public String getPreviousStatus() { return previousStatus; }
    public void setPreviousStatus(String previousStatus) { this.previousStatus = previousStatus; }

    public String getNewStatus() { return newStatus; }
    public void setNewStatus(String newStatus) { this.newStatus = newStatus; }

    public LocalDateTime getActionDate() { return actionDate; }
    public void setActionDate(LocalDateTime actionDate) { this.actionDate = actionDate; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}