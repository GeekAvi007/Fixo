import React, { createContext, useState, useEffect, useContext } from "react";
import { appwriteService, account } from "../context/AppwriteService"; // ✅ Import AppwriteService

// ✅ Explicitly export AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ✅ Check if the user is already logged in (session persistence)
  useEffect(() => {
    const checkUserSession = async () => {
      try {
        // Fetch current session (this checks if the user is already logged in)
        const session = await account.get();
        setUser(session); // If logged in, set user state with session details
      } catch (error) {
        setUser(null); // If no session, clear user state
      }
    };
    checkUserSession();
  }, []); // Only run once on mount

  // ✅ Register a new user
  const registerUser = async (email, password, name) => {
    try {
      const response = await appwriteService.registerUser(email, password, name);
      setUser(response); // Set user state after registration
      return response;
    } catch (error) {
      console.error("Registration error:", error.message);
      throw error;
    }
  };

  // ✅ Login user
  const loginUser = async (email, password) => {
    try {
      // Create a session using the provided email and password
      const session = await account.createSession(email, password);
      setUser(session); // Set the user state after successful login
      return session; // Return session details (can be used for redirect, etc.)
    } catch (error) {
      console.error("Login error:", error.message); // Log any login errors
      throw error; // Rethrow to handle error in component
    }
  };

  // ✅ Logout user
  const logoutUser = async () => {
    try {
      // Logout the user using the appwrite service
      await appwriteService.logoutUser();
      setUser(null); // Clear user state after logout
    } catch (error) {
      console.error("Logout error:", error); // Log any logout errors
      throw error; // Rethrow to handle error in component
    }
  };

  return (
    // Provide the context to the children components
    <AuthContext.Provider value={{ user, registerUser, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom Hook for using AuthContext
export const useAuth = () => {
  return useContext(AuthContext); // Access the AuthContext from any component
};
