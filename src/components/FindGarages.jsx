import React, { useEffect } from 'react';
import { useFetchGarages } from '../hooks/useFetchGarages'; // Corrected import path

const FindGarages = ({ userId }) => {
  const { garages, loading, error } = useFetchGarages(userId);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Find Garages</h1>
      <ul>
        {garages.map((garage) => (
          <li key={garage.$id}>
            {garage.name} - {garage.location}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FindGarages;
