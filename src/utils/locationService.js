import { databases } from "../context/AppwriteService";
import { APPWRITE_DATABASE_ID, APPWRITE_MECHANIC_COLLECTION_ID } from "./appwriteConfig";

// Store mechanic's live location
export const updateMechanicLocation = async (mechanicId, latitude, longitude) => {
  try {
    await databases.updateDocument(
      APPWRITE_DATABASE_ID,
      APPWRITE_MECHANIC_COLLECTION_ID,
      mechanicId,
      { location: { latitude, longitude } }
    );
  } catch (error) {
    console.error("Error updating mechanic location:", error);
  }
};

// Fetch all active mechanics' locations
export const getNearbyMechanics = async () => {
  try {
    const response = await databases.listDocuments(APPWRITE_DATABASE_ID, APPWRITE_MECHANIC_COLLECTION_ID);
    return response.documents.map((doc) => doc.location);
  } catch (error) {
    console.error("Error fetching mechanic locations:", error);
    return [];
  }
};
