import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function BookingPage() {
  const location = useLocation();

  const room = location.state.room; // Extract the selected room from the location state.
  const timeslot = new Date(location.state.timeslot); // Extract and convert the timeslot from the location state to a Date object.
  const timeslotDuration = location.state.timeslotDuration; // Extract timeslot duration from the location state.

  const [email, setEmail] = useState(''); // State for user's email.
  const [endDate, setEndDate] = useState(); // State for the end date of the booking.
  const [timeslotFormattted, setFormattedTimeslot] = useState(new Date(timeslot).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })); // Format the timeslot for display.
  const [endTimeSlots, setEndTimeSlots] = useState([]); // State for end time slots.

  const navigate = useNavigate(); // Navigation hook for routing.

  useEffect(() => {
    calculateEndTimes(); // Calculate end times when the component mounts.
  }, []);

  const calculateEndTimes = () => {
    var endTimeSlots = [];
    let endTime = new Date(timeslot.getTime() + (timeslotDuration * 60000)); // Calculate the initial end time based on timeslot and duration.

    room.bookings.filter((availableTimeslot) => availableTimeslot > timeslot.toISOString()).forEach(availableTimeslot => {
      if (availableTimeslot === endTime.toISOString()) {
        endTimeSlots.push(availableTimeslot);
        endTime.setMinutes(endTime.getMinutes() + timeslotDuration); // Increment end time for consecutive slots.
      } else {
        return;
      }
    });

    endTimeSlots.push(endTime);

    setEndDate(endTimeSlots[0]); // Set the end date to the first end time slot.
    setEndTimeSlots(endTimeSlots); // Set the end time slots in the state.
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!room || !room._id || !timeslot || !endDate) {
      console.error('Invalid or missing data');
      return;
    }

    const bookingData = {
      email: email,
      room: room._id,
      start_date: timeslot,
      end_date: endDate,
    };

    try {
      const response = await fetch(process.env.REACT_APP_API_URL + '/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        navigate('/'); // Navigate to the home page after successful booking.
      } else {
        console.error('Booking failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mt-4">
      <div><Link to="/">Go Back</Link></div>
      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              Meeting Room Booking
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="selectedRoom">Selected Room</label>
                  <input type="text" className="form-control" id="selectedRoom" value={room.name} readOnly />
                </div>
                <div className="form-group">
                  <label htmlFor="startDate">Start Time</label>
                  <input type="text" className="form-control" id="startDate" value={timeslotFormattted} readOnly />
                </div>
                <div className="form-group">
                  <label htmlFor="endDate">End Time</label>
                  <select className="form-control" id="end_date" onChange={(e) => setEndDate(e.target.value)} required>
                    {endTimeSlots.map((time, index) => (
                      <option key={index} value={time}>
                        {new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" className="form-control" id="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Confirm Booking</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingPage