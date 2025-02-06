// src/api/BookingAPI.js

import { databases } from "../utils/appwriteConfig"; // Ensure Appwrite config is correctly set up
import { ID, Query } from "appwrite";

// Define database & collection IDs
const DATABASE_ID = "your-database-id";
const BOOKINGS_COLLECTION_ID = "your-bookings-collection-id";

/**
 * Fetch all bookings for a specific garage
 * @param {string} garageId - The ID of the garage
 * @returns {Promise<Array>} - List of bookings
 */
export async function fetchGarageBookings(garageId) {
  try {
    const response = await databases.listDocuments(DATABASE_ID, BOOKINGS_COLLECTION_ID, [
      Query.equal("garageId", garageId), // Query by garage ID
    ]);
    return response.documents;
  } catch (error) {
    console.error("Error fetching garage bookings:", error);
    return [];
  }
}

/**
 * Create a new booking
 * @param {Object} bookingData - Booking details
 * @returns {Promise<Object>} - Created booking document
 */
export async function createBooking(bookingData) {
  try {
    const response = await databases.createDocument(
      DATABASE_ID,
      BOOKINGS_COLLECTION_ID,
      ID.unique(), // Generates a unique ID
      bookingData
    );
    return response;
  } catch (error) {
    console.error("Error creating booking:", error);
    return null;
  }
}

/**
 * Cancel a booking
 * @param {string} bookingId - The ID of the booking to be deleted
 * @returns {Promise<Boolean>} - Returns true if deleted, false otherwise
 */
export async function cancelBooking(bookingId) {
  try {
    await databases.deleteDocument(DATABASE_ID, BOOKINGS_COLLECTION_ID, bookingId);
    return true;
  } catch (error) {
    console.error("Error canceling booking:", error);
    return false;
  }
}
