import { useEffect, useState } from "react";
import { AppwriteService } from "../context/AppwriteService";
import { useNavigate } from "react-router-dom";

const GarageDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
  }, []);

  // Fetch all pending bookings
  const fetchBookings = async () => {
    try {
      const response = await AppwriteService.getPendingBookings();
      setBookings(response);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  // Update booking status
  const updateBookingStatus = async (bookingId, status) => {
    try {
      await AppwriteService.updateBookingStatus(bookingId, status);
      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === bookingId ? { ...booking, status } : booking
        )
      );
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Garage Dashboard</h2>

      {loading ? (
        <p>Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p>No new bookings available.</p>
      ) : (
        bookings.map((booking) => (
          <div key={booking.id} className="mb-4 p-4 border rounded-lg shadow-sm">
            <p className="text-lg font-semibold">Booking ID: {booking.id}</p>
            <p>Vehicle: {booking.vehicleType}</p>
            <p>Issue: {booking.issue}</p>
            <p>Location: {booking.location}</p>
            <p>Status: <span className="font-bold">{booking.status}</span></p>

            <div className="mt-2 flex gap-2">
              {booking.status === "Pending" && (
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded"
                  onClick={() => updateBookingStatus(booking.id, "Accepted")}
                >
                  Accept
                </button>
              )}

              {booking.status === "Accepted" && (
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                  onClick={() => updateBookingStatus(booking.id, "In Progress")}
                >
                  Start Service
                </button>
              )}

              {booking.status === "In Progress" && (
                <button
                  className="bg-gray-600 text-white px-4 py-2 rounded"
                  onClick={() => updateBookingStatus(booking.id, "Completed")}
                >
                  Mark Completed
                </button>
              )}

              <button
                className="bg-red-600 text-white px-4 py-2 rounded"
                onClick={() => updateBookingStatus(booking.id, "Cancelled")}
              >
                Cancel
              </button>

              <button
                className="bg-indigo-600 text-white px-4 py-2 rounded"
                onClick={() => navigate(`/map?location=${booking.location}`)}
              >
                View Location
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default GarageDashboard;
