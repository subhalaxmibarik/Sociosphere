// src/components/LiveLocation.jsx
import { useRef } from "react";
import socket from "../socket";

const LiveLocation = ({ userId, name }) => {
  const watchIdRef = useRef(null);

  const startSharing = () => {
    if (!navigator.geolocation) return alert("Geolocation not supported");

    if (watchIdRef.current !== null) return; // already sharing

    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        socket.emit("sendLocation", { userId, name, lat: latitude, lng: longitude });
      },
      (err) => console.error(err),
      { enableHighAccuracy: true }
    );
  };

  const stopSharing = () => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    socket.emit("stopLocation", { userId });
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      <button onClick={startSharing}>Share Live Location</button>
      <button onClick={stopSharing} style={{ marginLeft: "1rem" }}>Stop</button>
    </div>
  );
};

export default LiveLocation;
