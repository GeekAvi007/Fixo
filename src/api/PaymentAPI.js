// src/api/PaymentAPI.js
// Handles payment-related API calls

import { appwriteDB } from "../utils/appwriteConfig";  // Import Appwrite configuration

const PAYMENT_COLLECTION_ID = "your_payment_collection_id"; // Replace with actual ID

/**
 * Initiates a payment transaction
 * @param {Object} paymentData - Payment details
 * @returns {Promise<Object>} - Created payment record
 */
export const initiatePayment = async (paymentData) => {
    try {
        const response = await appwriteDB.createDocument(
            "your_database_id",  // Replace with actual DB ID
            PAYMENT_COLLECTION_ID,
            paymentData
        );
        return response;
    } catch (error) {
        console.error("Error initiating payment:", error);
        throw error;
    }
};

/**
 * Retrieves payment details by payment ID
 * @param {string} paymentId - Unique payment identifier
 * @returns {Promise<Object>} - Payment details
 */
export const getPaymentDetails = async (paymentId) => {
    try {
        const response = await appwriteDB.getDocument(
            "your_database_id",
            PAYMENT_COLLECTION_ID,
            paymentId
        );
        return response;
    } catch (error) {
        console.error("Error fetching payment details:", error);
        throw error;
    }
};

/**
 * Updates payment status (e.g., success, failure)
 * @param {string} paymentId - Unique payment identifier
 * @param {Object} updateData - Fields to update
 * @returns {Promise<Object>} - Updated payment record
 */
export const updatePaymentStatus = async (paymentId, updateData) => {
    try {
        const response = await appwriteDB.updateDocument(
            "your_database_id",
            PAYMENT_COLLECTION_ID,
            paymentId,
            updateData
        );
        return response;
    } catch (error) {
        console.error("Error updating payment status:", error);
        throw error;
    }
};
