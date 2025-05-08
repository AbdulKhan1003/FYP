import React from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Routing from "./Routing";

// 👤 Custom marker icons
const userIcon = new L.Icon({
  iconUrl: "person.png",
  iconSize: [23, 26],
  iconAnchor: [9, 34],
});

const riderIcon = new L.Icon({
  iconUrl: 'rider-icon.png',
  iconSize: [35, 35],
  iconAnchor: [17, 34],
});

// 🗺️ Auto-fit map bounds to both markers
const FitBounds = ({ positions }) => {
  const map = useMap();

  React.useEffect(() => {
    if (positions.length === 2) {
      const bounds = L.latLngBounds(positions);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [positions, map]);

  return null;
};

const DeliveryMap = ({ userPos, riderPos }) => {
  const positions = [userPos, riderPos];

  return (
    <MapContainer
      style={{ height: "500px", width: "100%" }}
      center={userPos}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={userPos} icon={userIcon} />
      <Marker position={riderPos} icon={riderIcon} />
      <FitBounds positions={positions} />
      <Routing from={userPos} to={riderPos} />
    </MapContainer>
  );
};

export default DeliveryMap;
