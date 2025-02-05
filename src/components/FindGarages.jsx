import { useEffect, useState } from "react";
import { fetchNearestGarages } from "../hooks/useFetchGarages";

const FindGarages = ({ userLocation }) => {
  const [garages, setGarages] = useState([]);

  useEffect(() => {
    if (userLocation) {
      fetchNearestGarages(userLocation).then(setGarages);
    }
  }, [userLocation]);

  return (
    <div>
      <h2>Nearby Garages</h2>
      <ul>
        {garages.map((garage) => (
          <li key={garage.id}>{garage.name} - {garage.distance} km away</li>
        ))}
      </ul>
    </div>
  );
};

export default FindGarages;
