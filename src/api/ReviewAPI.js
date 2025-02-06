// src/api/ReviewAPI.js
// Handles reviews and ratings for mechanics and garages

import { appwriteDB } from "../utils/appwriteConfig";  // Import Appwrite configuration

const REVIEWS_COLLECTION_ID = "your_reviews_collection_id"; // Replace with actual ID

/**
 * Submits a review for a mechanic/garage
 * @param {Object} reviewData - Review details (userId, mechanicId, rating, comments)
 * @returns {Promise<Object>} - Created review record
 */
export const submitReview = async (reviewData) => {
    try {
        const response = await appwriteDB.createDocument(
            "your_database_id",
            REVIEWS_COLLECTION_ID,
            reviewData
        );
        return response;
    } catch (error) {
        console.error("Error submitting review:", error);
        throw error;
    }
};

/**
 * Fetches all reviews for a mechanic/garage
 * @param {string} mechanicId - Unique mechanic/garage identifier
 * @returns {Promise<Array>} - List of reviews
 */
export const getReviews = async (mechanicId) => {
    try {
        const response = await appwriteDB.listDocuments(
            "your_database_id",
            REVIEWS_COLLECTION_ID,
            [`mechanicId=${mechanicId}`]
        );
        return response.documents;
    } catch (error) {
        console.error("Error fetching reviews:", error);
        throw error;
    }
};

/**
 * Updates an existing review (e.g., edits rating or comment)
 * @param {string} reviewId - Unique review identifier
 * @param {Object} updateData - Fields to update
 * @returns {Promise<Object>} - Updated review record
 */
export const updateReview = async (reviewId, updateData) => {
    try {
        const response = await appwriteDB.updateDocument(
            "your_database_id",
            REVIEWS_COLLECTION_ID,
            reviewId,
            updateData
        );
        return response;
    } catch (error) {
        console.error("Error updating review:", error);
        throw error;
    }
};

/**
 * Deletes a review by ID
 * @param {string} reviewId - Unique review identifier
 * @returns {Promise<void>}
 */
export const deleteReview = async (reviewId) => {
    try {
        await appwriteDB.deleteDocument(
            "your_database_id",
            REVIEWS_COLLECTION_ID,
            reviewId
        );
    } catch (error) {
        console.error("Error deleting review:", error);
        throw error;
    }
};
