// VenueService.java
package com.example.backend.Venue;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VenueService {

    private final VenueRepository venueRepository;

    @Autowired
    public VenueService(VenueRepository venueRepository) {
        this.venueRepository = venueRepository;
    }

    public List<Venue> getAllVenues() {
        return venueRepository.findAll();
    }

    public Venue getVenueById(Long id) {
        Optional<Venue> venueOptional = venueRepository.findById(id);
        return venueOptional.orElse(null);
    }

    public Venue createVenue(Venue venue) {
        return venueRepository.save(venue);
    }

    public Venue updateVenue(Long id, Venue updatedVenue) {
        Optional<Venue> venueOptional = venueRepository.findById(id);
        if (venueOptional.isPresent()) {
            Venue existingVenue = venueOptional.get();
            existingVenue.setName(updatedVenue.getName());
            existingVenue.setAddress(updatedVenue.getAddress());
            existingVenue.setFacilities(updatedVenue.getFacilities());
            existingVenue.setCapacity(updatedVenue.getCapacity());
            existingVenue.setPrice(updatedVenue.getPrice());
            return venueRepository.save(existingVenue);
        }
        return null;
    }

    public void deleteVenue(Long id) {
        venueRepository.deleteById(id);
    }
    
    // Method to book a venue
    public boolean bookVenue(Long id) {
        Optional<Venue> venueOptional = venueRepository.findById(id);
        if (venueOptional.isPresent()) {
            Venue venue = venueOptional.get();
            // Add logic to book the venue (set booked to true)
            venue.setBooked(true);
            venueRepository.save(venue);
            return true;
        }
        return false;
    }
    
 // Method to cancel booking of venue
    public boolean cancelVenueBooking(Long id) {
        Optional<Venue> venueOptional = venueRepository.findById(id);
        if (venueOptional.isPresent()) {
            Venue venue = venueOptional.get();
            // Add logic to cancel the venue booking (set booked to false)
            venue.setBooked(false);
            venueRepository.save(venue);
            return true;
        }
        return false;
    }
}
