import { Client, Account, Databases } from "appwrite";

// Initialize Appwrite client
const client = new Client();
client.setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT).setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

// Initialize Appwrite services
export const account = new Account(client);
export const databases = new Databases(client);

// AUTH FUNCTIONS
export const registerUser = async (email, password, name) => {
  return await account.create("unique()", email, password, name);
};

export const loginUser = async (email, password) => {
  return await account.createEmailSession(email, password);
};

export const logoutUser = async () => {
  return await account.deleteSession("current");
};

// BOOKING FUNCTIONS
export const createBooking = async (userId, serviceType, location) => {
  return await databases.createDocument("serviceDB", "bookings", "unique()", {
    userId,
    serviceType,
    location,
    status: "Pending",
  });
};

export const getUserBookings = async (userId) => {
  return await databases.listDocuments("serviceDB", "bookings", [
    { key: "userId", value: userId },
  ]);
};

// MECHANIC TRACKING
export const updateMechanicLocation = async (mechanicId, location) => {
  return await databases.updateDocument("serviceDB", "mechanics", mechanicId, {
    location,
  });
};
