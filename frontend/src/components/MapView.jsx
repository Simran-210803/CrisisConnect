import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";

function AutoFocus({ alerts }) {
  const map = useMap();

  useEffect(() => {
    if (alerts.length > 0) {
      const latest = alerts[alerts.length - 1];
      map.setView([latest.lat, latest.lng], 15, { animate: true });
    }
  }, [alerts, map]);

  return null;
}

export default function MapView({ alerts }) {
  return (
    <MapContainer
      center={[19.076, 72.8777]}
      zoom={12}
      style={{ height: "400px", width: "100%", borderRadius: "10px" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <AutoFocus alerts={alerts} />

      {alerts.map((a, i) => (
        <Marker key={i} position={[a.lat, a.lng]} />
      ))}
    </MapContainer>
  );
}