import { createContext, useContext, useEffect, useState } from "react";

const MechanicTrackingContext = createContext();

export const MechanicTrackingProvider = ({ children }) => {
  const [mechanicLocations, setMechanicLocations] = useState({});

  useEffect(() => {
    const mockMechanicTracking = setInterval(() => {
      setMechanicLocations((prev) => ({
        ...prev,
        mechanic1: {
          lat: 23.5204 + Math.random() * 0.01,
          lon: 87.3119 + Math.random() * 0.01,
        },
      }));
    }, 5000);

    return () => clearInterval(mockMechanicTracking);
  }, []);

  return (
    <MechanicTrackingContext.Provider value={{ mechanicLocations }}>
      {children}
    </MechanicTrackingContext.Provider>
  );
};

export const useMechanicTracking = () => useContext(MechanicTrackingContext);
