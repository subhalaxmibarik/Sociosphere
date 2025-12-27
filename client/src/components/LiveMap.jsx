import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leafletFix"; // fix for default icons

const LiveMap = ({ lat, lng }) => {
  if (!lat || !lng) return null;

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <MapContainer center={[lat, lng]} zoom={15} style={{ height: "100%", width: "100%", borderRadius: "10px" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[lat, lng]}>
          <Popup>Friend's Live Location</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default LiveMap;
