package com.example.backend.Venue;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/venues")
public class VenueController {

    private final VenueService venueService;

    @Autowired
    public VenueController(VenueService venueService) {
        this.venueService = venueService;
    }

    @GetMapping
    public List<Venue> getAllVenues() {
        return venueService.getAllVenues();
    }
    
 // Endpoint to retrieve names of all venues
    @GetMapping("/names")
    public List<VenueNameDTO> getAllVenueNames() {
        List<Venue> venues = venueService.getAllVenues();
        return venues.stream()
                     .map(venue -> new VenueNameDTO(venue.getName()))
                     .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public Venue getVenueById(@PathVariable Long id) {
        return venueService.getVenueById(id);
    }

    @PostMapping
    public Venue createVenue(@RequestBody Venue venue) {
        return venueService.createVenue(venue);
    }

    @PutMapping("/{id}")
    public Venue updateVenue(@PathVariable Long id, @RequestBody Venue venue) {
        return venueService.updateVenue(id, venue);
    }
    
    // Endpoint to book a venue
    @PutMapping("/{id}/book")
    public ResponseEntity<String> bookVenue(@PathVariable Long id) {
        boolean booked = venueService.bookVenue(id);
        if (booked) {
            return ResponseEntity.ok("Venue booked. Backend updated!");
        } else {
            return ResponseEntity.badRequest().body("Unable to book the venue.");
        }
    }
    
    // Endpoint to cancel booking
    @PutMapping("/{id}/cancel")
    public ResponseEntity<String> cancelVenueBooking(@PathVariable Long id) {
        boolean cancelled = venueService.cancelVenueBooking(id);
        if (cancelled) {
            return ResponseEntity.ok("Venue booking cancelled. Backend updated!");
        } else {
            return ResponseEntity.badRequest().body("Unable to cancel the venue booking.");
        }
    }

    @DeleteMapping("/{id}")
    public void deleteVenue(@PathVariable Long id) {
        venueService.deleteVenue(id);
    }
}
