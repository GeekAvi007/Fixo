import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppwriteService } from "../context/AppwriteService";

const PaymentGateway = ({ bookingId, amount }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Function to handle payment
  const handlePayment = async () => {
    setLoading(true);

    try {
      // Simulated Razorpay payment integration
      const options = {
        key: "rzp_test_yourkey", // Replace with actual Razorpay key
        amount: amount * 100, // Convert to paisa
        currency: "INR",
        name: "Fixo Services",
        description: "Service Payment",
        handler: async function (response) {
          // Save payment details in Appwrite DB
          await AppwriteService.confirmPayment(bookingId, response.razorpay_payment_id);
          alert("Payment successful!");
          navigate("/dashboard");
        },
        prefill: {
          name: "John Doe",
          email: "johndoe@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3498db",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Complete Payment</h2>
      <p className="mb-2">Booking ID: {bookingId}</p>
      <p className="mb-4 font-bold">Amount: ₹{amount}</p>
      
      <button
        className="bg-green-600 text-white px-4 py-2 rounded w-full"
        onClick={handlePayment}
        disabled={loading}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
};

export default PaymentGateway;
