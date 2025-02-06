import { Client, Account, Databases, ID, Query } from "appwrite";

class AppwriteService {
  constructor() {
    this.client = new Client();

    this.client
      .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) // ✅ Ensure correct Appwrite endpoint
      .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); // ✅ Ensure correct project ID

    this.account = new Account(this.client);
    this.databases = new Databases(this.client);
  }

  // ✅ USER AUTH FUNCTIONS
  async registerUser(email, password, name) {
    try {
      return await this.account.create(ID.unique(), email, password, name);
    } catch (error) {
      console.error("Error registering user:", error.message);
      throw error;
    }
  }

  async loginUser(email, password) {
    try {
      const session = await this.account.createEmailSession(email, password); // ✅ Fixed function name
      return session;
    } catch (error) {
      console.error("Error logging in:", error.message);
      throw error;
    }
  }

  async logoutUser() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  }

  // ✅ BOOKING FUNCTIONS
  async createBooking(userId, serviceType, location) {
    try {
      return await this.databases.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_BOOKINGS_COLLECTION_ID,
        ID.unique(),
        { userId, serviceType, location, status: "Pending" }
      );
    } catch (error) {
      console.error("Error creating booking:", error.message);
      throw error;
    }
  }

  async getUserBookings(userId) {
    try {
      return await this.databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_BOOKINGS_COLLECTION_ID,
        [Query.equal("userId", userId)]
      );
    } catch (error) {
      console.error("Error fetching user bookings:", error.message);
      throw error;
    }
  }

  // ✅ MECHANIC TRACKING
  async updateMechanicLocation(mechanicId, location) {
    try {
      return await this.databases.updateDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_MECHANICS_COLLECTION_ID,
        mechanicId,
        { location }
      );
    } catch (error) {
      console.error("Error updating mechanic location:", error.message);
      throw error;
    }
  }
}

// ✅ Export a single instance (Correctly initialized with the client)
export const appwriteService = new AppwriteService();
export const account = new Account()
export const databases = new Databases()