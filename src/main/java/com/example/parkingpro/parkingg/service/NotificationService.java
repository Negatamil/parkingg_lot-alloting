package com.example.parkingpro.parkingg.service;

import com.example.parkingpro.parkingg.entity.Notification;
import com.example.parkingpro.parkingg.entity.User;
import com.example.parkingpro.parkingg.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class NotificationService {
    
    @Autowired
    private NotificationRepository notificationRepository;
    
    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll();
    }
    
    public Optional<Notification> getNotificationById(Long id) {
        return notificationRepository.findById(id);
    }
    
    public List<Notification> getNotificationsByUser(User user) {
        return notificationRepository.findByUserOrderByCreatedAtDesc(user);
    }
    
    public List<Notification> getUnreadNotifications(User user) {
        return notificationRepository.findByUserAndIsRead(user, false);
    }
    
    public Long getUnreadCount(User user) {
        return notificationRepository.countByUserAndIsRead(user, false);
    }
    
    public Notification saveNotification(Notification notification) {
        return notificationRepository.save(notification);
    }
    
    public void deleteNotification(Long id) {
        notificationRepository.deleteById(id);
    }
}