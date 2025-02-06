import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { appwriteService } from "../context/AppwriteService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ✅ Best practice


const BookingForm = () => {
  const { user } = useContext(AuthContext); // Get logged-in user details
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    vehicleType: "",
    issue: "",
    location: "",
    contact: user ? user.phone : "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.vehicleType || !formData.issue || !formData.location) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const response = await appwriteService.createBooking(formData);
      if (response) {
        alert("Booking confirmed! A mechanic will contact you shortly.");
        navigate("/dashboard"); // Redirect to dashboard after booking
      }
    } catch (err) {
      setError("Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Book a Mechanic</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">Vehicle Type:</label>
        <select
          name="vehicleType"
          value={formData.vehicleType}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select</option>
          <option value="Car">Car</option>
          <option value="Bike">Bike</option>
        </select>

        <label className="block mt-3 mb-2">Describe Issue:</label>
        <textarea
          name="issue"
          value={formData.issue}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          rows="3"
          required
        />

        <label className="block mt-3 mb-2">Your Location:</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <label className="block mt-3 mb-2">Contact Number:</label>
        <input
          type="tel"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
          disabled
        />

        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded w-full"
          disabled={loading}
        >
          {loading ? "Booking..." : "Confirm Booking"}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
