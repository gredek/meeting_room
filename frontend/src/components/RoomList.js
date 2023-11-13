import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/roomList.css';

const RoomList = ({ selectedDate, selectedCapacity }) => {
  const [rooms, setRooms] = useState([]); // State to store room data from the API.
  const [timeslotDuration, setTimeslotDuration] = useState(30); // State for timeslot duration with a default value of 30 minutes.

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL + `/available/${selectedDate}/${selectedCapacity}`);
        // Fetch room data based on the selected date and capacity.

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        setTimeslotDuration(data.timeslot_duration); // Update timeslot duration from the API response.
        setRooms(data.rooms); // Update the list of available rooms from the API response.
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchRooms(); // Fetch data when the component mounts or when selectedDate and selectedCapacity change.
  }, [selectedDate, selectedCapacity]);

  const navigate = useNavigate();
  const openBooking = (room, timeslot) => {
    navigate('/booking', { state: { room, timeslot, timeslotDuration } });
    // Navigate to the '/booking' route with room, timeslot, and timeslotDuration passed as state.
  }

  return (
    <div className="container mt-4">
      <h2>Available Rooms</h2>
      {rooms.map((room) => (
        <div key={room.id} className="card mt-3">
          <div className="card-body">
            <h5 className="card-title">{room.name}</h5>
            <p>Capacity: {room.capacity}</p>
            <p>Available Time Slots:</p>
            <div className="btn-group">
              {room.bookings
                .filter((timeslot) => {
                  const time = new Date(timeslot);
                  return time.getHours() >= 8 && time.getHours() <= 17;
                })
                .map((timeSlot) => (
                  <button className="btn btn-success button-spacing" key={timeSlot} onClick={() => openBooking(room, timeSlot)}>
                    {new Date(timeSlot).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                  </button>
                ))}
            </div>
          </div>

        </div>
      ))}

    </div>
  );
};

export default RoomList;
