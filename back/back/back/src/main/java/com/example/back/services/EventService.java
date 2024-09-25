package com.example.back.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import com.example.back.model.Event;
import com.example.back.repository.EventRepository;

@Service
public class EventService {

    @Autowired
    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    // Method to get all events
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    // Method to get an event by ID
    public Optional<Event> getEventById(Long id) {
        return eventRepository.findById(id);
    }

    // Method to add a new event
    public Event addEvent(Event event) {
        return eventRepository.save(event);
    }

    // Method to update an existing event
    public Event updateEvent(Long id, Event eventDetails) throws Exception {
        return eventRepository.findById(id)
                .map(event -> {
                    event.setTitle(eventDetails.getTitle());
                    event.setDescription(eventDetails.getDescription());
                    event.setDate(eventDetails.getDate());
                    return eventRepository.save(event);
                }).orElseThrow(() -> new Exception("Event not found with id " + id));
    }

    // Method to delete an event by ID
    public void deleteEvent(Long id) {
        eventRepository.deleteById(id);
    }
}
