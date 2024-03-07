package com.example.backend.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/events")
public class EventController {

    private final EventService eventService;

    @Autowired
    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping
    public List<Event> getAllEvents() {
        return eventService.getAllEvents();
    }

    // GET event by ID
    @GetMapping("/{id}")
    public Event getEventById(@PathVariable Long id) {
        return eventService.getEventById(id);
    }

    // CREATE a new event
    @PostMapping
    public Event createEvent(@RequestBody Event event) {
        return eventService.createEvent(event);
    }

    // UPDATE an existing event
    @PutMapping("/{id}")
    public Event updateEvent(@PathVariable Long id, @RequestBody Event event) {
        return eventService.updateEvent(id, event);
    }
    
    // Endpoint to mark an event as attended
    @PutMapping("/{id}/attend")
    public ResponseEntity<String> markEventAsAttended(@PathVariable Long id) {
        boolean attended = eventService.markEventAsAttended(id);
        if (attended) {
            return ResponseEntity.ok("Event marked as attended. Backend updated!");
        } else {
            return ResponseEntity.badRequest().body("Unable to mark the event as attended.");
        }
    }

    // Endpoint to mark an event as not attended
    @PutMapping("/{id}/not-attend")
    public ResponseEntity<String> markEventAsNotAttended(@PathVariable Long id) {
        boolean notAttended = eventService.markEventAsNotAttended(id);
        if (notAttended) {
            return ResponseEntity.ok("Event marked as not attended. Backend updated!");
        } else {
            return ResponseEntity.badRequest().body("Unable to mark the event as not attended.");
        }
    }

    // DELETE an event
    @DeleteMapping("/{id}")
    public void deleteEvent(@PathVariable Long id) {
        eventService.deleteEvent(id);
    }
}
