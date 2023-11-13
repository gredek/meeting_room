import React from 'react';

const RoomFilter = ({ selectedDate, selectedCapacity, updateSelectedDate, updateSelectedCapacity }) => {
  const MAX_CAPACITY = 20;

  const handleDateChange = (event) => {
    updateSelectedDate(event.target.value); // This updates the selected date when the date input changes.
  };

  const handleCapacityChange = (event) => {
    const capacity = parseInt(event.target.value, 10); // Parse the selected capacity to an integer.
    updateSelectedCapacity(capacity); // Update the selected capacity when the select input changes.
  };

  return (
    <div className="container">
      <form>
        <div className="form-group col-md-2">
          <label htmlFor="date">Date</label>
          <input type="date" className="form-control" id="date" value={selectedDate} onChange={handleDateChange} />
          {/* The date input field with a label and event handler for value changes. */}
        </div>
        <div className="form-row">
          <div className="form-group col-md-2">
            <label htmlFor="select2">Attendees</label>
            <select className="form-control" id="select2" value={selectedCapacity} onChange={handleCapacityChange}>
              {Array.from({ length: MAX_CAPACITY }, (_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
            {/* The capacity select input with a label and options generated dynamically. */}
          </div>
        </div>

      </form>
    </div>
  );
};

export default RoomFilter;