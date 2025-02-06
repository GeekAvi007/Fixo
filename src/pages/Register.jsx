import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { registerUser } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null); // Reset error before attempting registration

    try {
      await registerUser(email, password, name);
      navigate("/dashboard"); // Redirect after successful registration
    } catch (err) {
      if (err.code === 409) {
        setError("User with this email already exists. Try logging in.");
      } else {
        setError("Registration failed. Try again.");
      }
      console.error("Registration error:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />

          <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
            Register
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <button onClick={() => navigate("/login")} className="text-blue-500 underline">
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
