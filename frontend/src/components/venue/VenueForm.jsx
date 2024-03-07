import React, { useState } from 'react';
import axios from 'axios';
import './VenueForm.css';

const VenueForm = ({ onCancel, venue, refreshVenues }) => {
    const [name, setName] = useState(venue ? venue.name : '');
    const [address, setAddress] = useState(venue ? venue.address : '');
    const [facilities, setFacilities] = useState(venue ? venue.facilities : []);
    const [capacity, setCapacity] = useState(venue ? venue.capacity : '');
    const [price, setPrice] = useState(venue ? venue.price : '');

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const handleSubmit = (e) => {
        e.preventDefault();
        const venueData = { name, address, facilities, capacity, price };
        console.log(venueData);

        if (venue) {
            // Update existing venue
            axios
                .put(`http://localhost:8080/venues/${venue.id}`, venueData)
                .then((response) => {
                    console.log('Venue updated successfully:', response.data);
                    refreshVenues(); // Fetch venues again to refresh the venue list
                    onCancel(); // Hide the form after updating venue
                })
                .catch((error) => {
                    console.error('Error updating venue:', error);
                });
        } else {
            // Add new venue
            axios
                .post('http://localhost:8080/venues', venueData)
                .then((response) => {
                    console.log('Venue added successfully:', response.data);
                    // Reset form fields
                    setName('');
                    setAddress('');
                    setFacilities([]);
                    setCapacity('');
                    setPrice('');
                    refreshVenues(); // Fetch venues again to refresh the venue list
                    onCancel(); // Hide the form after adding venue
                })
                .catch((error) => {
                    console.error('Error adding venue:', error);
                });
        }
    };

    const handleCancel = () => {
        onCancel(); // Call the onCancel function passed as prop
    };

    const handleFacilitiesChange = (e) => {
        const { value } = e.target;
        const updatedFacilities = facilities.includes(value)
            ? facilities.filter((facility) => facility !== value)
            : [...facilities, value];
        setFacilities(updatedFacilities);
    };

    return (
        <div className="form">
            <div className="title">{venue ? 'UPDATE VENUE' : 'ADD VENUE'}</div>
            <div className="subtitle">Let's {venue ? 'update' : 'add'} a Venue!</div>
            <form onSubmit={handleSubmit}>
                <div className="input-container ic1">
                    <input
                        id="name"
                        className="input"
                        type="text"
                        placeholder=" "
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <div className="cut"></div>
                    <label htmlFor="name" className="placeholder">
                        Venue Name
                    </label>
                </div>
                <div className="input-container ic2">
                    <input
                        id="address"
                        className="input"
                        type="text"
                        placeholder=" "
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <div className="cut"></div>
                    <label htmlFor="address" className="placeholder">
                        Address
                    </label>
                </div>
                <div className="input-container ic2 height">
                        <label className="facilities">Facilities:</label>
                        <div className='checkbox-container'>
                            <div className='checkbox-item'>
                                <input type="checkbox" value="Meeting Room" checked={facilities.includes('Meeting Room')} onChange={handleFacilitiesChange} />
                                <label>Meeting Room</label>
                            </div>
                            <div className='checkbox-item'>
                                <input type="checkbox" value="Auditorium" checked={facilities.includes('Auditorium')} onChange={handleFacilitiesChange} />
                                <label>Auditorium</label>
                            </div>
                            <div className='checkbox-item'>
                                <input type="checkbox" value="Exhibition Hall" checked={facilities.includes('Exhibition Hall')} onChange={handleFacilitiesChange} />
                                <label>Exhibition Hall</label>
                            </div>
                            <div className='checkbox-item'>
                                <input type="checkbox" value="Catering" checked={facilities.includes('Catering')} onChange={handleFacilitiesChange} />
                                <label>Catering</label>
                            </div>
                            <div className='checkbox-item'>
                                <input type="checkbox" value="Parking" checked={facilities.includes('Parking')} onChange={handleFacilitiesChange} />
                                <label>Parking</label>
                            </div>
                        </div>
                </div>
                <div className="input-container ic2">
                    <input
                        id="capacity"
                        className="input"
                        type="number"
                        placeholder=" "
                        required
                        value={capacity}
                        onChange={(e) => setCapacity(e.target.value)}
                    />
                    <div className="cut"></div>
                    <label htmlFor="capacity" className="placeholder">
                        Capacity
                    </label>
                </div>
                <div className="input-container ic2">
                    <input
                        id="price"
                        className="input"
                        type="number"
                        placeholder=" "
                        required
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <div className="cut cut-short"></div>
                    <label htmlFor="price" className="placeholder">
                        Price
                    </label>
                </div>
                <div>
                    <button type="submit" className="submit">
                        {venue ? 'Update' : 'Submit'}
                    </button>
                    <button type="button" className="cancel" onClick={handleCancel}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default VenueForm;
