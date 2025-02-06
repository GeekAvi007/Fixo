import { useState, useEffect } from "react";
import { Databases } from "appwrite";
import { appwriteService } from "../context/AppwriteService";

export const useFetchGarages = () => {
  const [garages, setGarages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGarages = async () => {
      try {
        const response = await appwriteService.databases.listDocuments(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_GARAGES_COLLECTION_ID
        );
        setGarages(response.documents);
      } catch (error) {
        console.error("Error fetching garages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGarages();
  }, []);

  return { garages, loading };
};
