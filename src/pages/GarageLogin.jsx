import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const GarageLogin = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      alert("Login successful!");
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div>
      <h2>Garage Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default GarageLogin;
