import { useEffect } from "react";

const GetLocation = ({ onLocationFetched }) => {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        onLocationFetched({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => console.error("Error getting location:", error),
      { enableHighAccuracy: true }
    );
  }, [onLocationFetched]);

  return null;
};

export default GetLocation;
