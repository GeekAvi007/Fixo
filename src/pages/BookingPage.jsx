import { useState, useEffect } from "react";
import { databases } from "../context/AppwriteService";

const BookingPage = ({ bookingId }) => {
  const [status, setStatus] = useState("Pending");

  useEffect(() => {
    const fetchStatus = async () => {
      const response = await databases.getDocument("serviceDB", "bookings", bookingId);
      setStatus(response.status);
    };
    fetchStatus();
  }, [bookingId]);

  const cancelBooking = async () => {
    await databases.updateDocument("serviceDB", "bookings", bookingId, { status: "Cancelled" });
    alert("Booking cancelled.");
  };

  return (
    <div>
      <h2>Booking Status: {status}</h2>
      {status === "Pending" && <button onClick={cancelBooking} className="bg-red-500 p-2">Cancel</button>}
    </div>
  );
};

export default BookingPage;
