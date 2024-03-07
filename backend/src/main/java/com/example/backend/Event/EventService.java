package com.example.backend.Event;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    private final EventRepository eventRepository;

    @Autowired
    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

	// Method to retrieve an event by ID
    public Event getEventById(Long id) {
        Optional<Event> eventOptional = eventRepository.findById(id);
        return eventOptional.orElse(null);
    }

    // Method to create a new event
    public Event createEvent(Event event) {
        return eventRepository.save(event);
    }

    // Method to update an existing event
    public Event updateEvent(Long id, Event updatedEvent) {
        Optional<Event> eventOptional = eventRepository.findById(id);
        if (eventOptional.isPresent()) {
            Event existingEvent = eventOptional.get();
            existingEvent.setName(updatedEvent.getName());
            existingEvent.setVenue(updatedEvent.getVenue());
            existingEvent.setTicket(updatedEvent.getTicket());
            existingEvent.setDate(updatedEvent.getDate());
            return eventRepository.save(existingEvent);
        }
        return null;
    }
    
    // Method to mark an event as attended
    public boolean markEventAsAttended(Long id) {
        Optional<Event> eventOptional = eventRepository.findById(id);
        if (eventOptional.isPresent()) {
            Event event = eventOptional.get();
            // Set attending to true
            event.setAttending(true);
            eventRepository.save(event);
            return true;
        }
        return false;
    }

    // Method to mark an event as not attended
    public boolean markEventAsNotAttended(Long id) {
        Optional<Event> eventOptional = eventRepository.findById(id);
        if (eventOptional.isPresent()) {
            Event event = eventOptional.get();
            // Set attending to false
            event.setAttending(false);
            eventRepository.save(event);
            return true;
        }
        return false;
    }

    // Method to delete an event
    public void deleteEvent(Long id) {
        eventRepository.deleteById(id);
    }
}
