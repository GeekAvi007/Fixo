import { useEffect, useState } from "react";
import { databases } from "../context/AppwriteService";

const Profile = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await databases.getDocument("serviceDB", "users", userId);
        setUserData(response);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchUserBookings = async () => {
      try {
        const response = await databases.listDocuments("serviceDB", "bookings", [
          { key: "userId", value: userId }
        ]);
        setBookings(response.documents);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchUserData();
    fetchUserBookings();
  }, [userId]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">👤 My Profile</h2>
      {userData ? (
        <div className="mt-4">
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Phone:</strong> {userData.phone || "Not provided"}</p>
        </div>
      ) : (
        <p>Loading user details...</p>
      )}

      <h3 className="text-xl font-bold mt-6">📜 Booking History</h3>
      {bookings.length > 0 ? (
        <ul className="mt-3">
          {bookings.map((booking) => (
            <li key={booking.$id} className="border p-2 mt-2">
              <strong>Service:</strong> {booking.serviceType} <br />
              <strong>Status:</strong> {booking.status}
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default Profile;
