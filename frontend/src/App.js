import React, { useState } from 'react';
import BookingPage from './components/BookingPage';
import TopNavBar from './components/TopNavBar';
import RoomList from './components/RoomList';
import RoomFilter from './components/RoomFilter';

import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";

const App = () => {
  // Initialize state variables for selected date and capacity, and functions to update them.
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedCapacity, setSelectedCapacity] = useState(2);

  const updateSelectedDate = (value) => {
    setSelectedDate(value); // Update the selected date.
  };

  const updateSelectedCapacity = (value) => {
    setSelectedCapacity(value); // Update the selected capacity.
  };

  // Define the layout component that includes the top navigation bar and an outlet for rendering child components.
  function Layout() {
    return (
      <>
        <div>
          <TopNavBar /> {/* Render the top navigation bar. */}
          <div className="container mt-4">
            <Outlet /> {/* Render child components based on the current route. */}
          </div>
        </div>
      </>
    )
  }

  // Define a component (RoomComponent) to render RoomFilter and RoomList components.
  const RoomComponent = () => (
    <>
      <RoomFilter selectedDate={selectedDate} selectedCapacity={selectedCapacity} updateSelectedDate={updateSelectedDate} updateSelectedCapacity={updateSelectedCapacity} />
      <RoomList selectedDate={selectedDate} selectedCapacity={selectedCapacity} />
    </>
  );

  // Create a router configuration with routes and their corresponding elements.
  const router = createBrowserRouter([
    {
      element: <Layout />, // The main layout component that wraps the entire application.
      children: [
        {
          path: "/",
          element: <RoomComponent />, // Render RoomComponent when the path is "/" (root).

        },
        {
          path: "/booking",
          element: <BookingPage />, // Render the BookingPage component when the path is "/booking".
        },
      ]
    }
  ]);

  return (
    <RouterProvider router={router} /> // Provide the router to the application.
  );
};

export default App;