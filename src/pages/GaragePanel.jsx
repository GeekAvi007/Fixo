import { useState, useEffect } from "react";
import { fetchGarageBookings } from "../api/BookingAPI";

const GaragePanel = ({ garageId }) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchGarageBookings(garageId).then(setBookings);
  }, [garageId]);

  return (
    <div>
      <h2>Garage Panel</h2>
      {bookings.length ? (
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id}>{booking.user} - {booking.status}</li>
          ))}
        </ul>
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default GaragePanel;
