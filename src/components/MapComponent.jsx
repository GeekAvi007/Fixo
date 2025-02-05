import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { getMechanicLocations } from "../context/MechanicTracking";

const MapComponent = ({ userLocation }) => {
  const [mechanics, setMechanics] = useState([]);

  useEffect(() => {
    getMechanicLocations(setMechanics);
  }, []);

  return (
    <MapContainer center={userLocation} zoom={14} style={{ height: "400px", width: "100%" }}>
      {/* OpenStreetMap Tile Layer */}
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* User Marker */}
      <Marker position={userLocation}>
        <Popup>You are here</Popup>
      </Marker>

      {/* Mechanics Markers */}
      {mechanics.map((mechanic) => (
        <Marker key={mechanic.id} position={[mechanic.lat, mechanic.lng]}>
          <Popup>Mechanic {mechanic.name} is here</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
