import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { databases } from "../context/AppwriteService";

const PaymentPage = ({ bookingId, userId, amount }) => {
  const [paymentStatus, setPaymentStatus] = useState("Pending");
  const navigate = useNavigate();

  const handlePayment = async () => {
    try {
      // Simulate payment processing (Replace with actual payment gateway)
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Update payment status in Appwrite DB
      await databases.updateDocument("serviceDB", "payments", bookingId, { status: "Paid" });

      setPaymentStatus("Paid");
      alert("Payment Successful!");

      // Redirect to profile or booking history
      navigate("/profile");
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Complete Payment</h2>
      <p>Amount to Pay: ₹{amount}</p>
      <button
        onClick={handlePayment}
        className="bg-green-500 text-white p-2 rounded mt-3"
        disabled={paymentStatus === "Paid"}
      >
        {paymentStatus === "Paid" ? "✅ Paid" : "💳 Pay Now"}
      </button>
    </div>
  );
};

export default PaymentPage;
