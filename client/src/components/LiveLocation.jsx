import { useRef } from "react";
import socket from "../socket";

const LiveLocation = ({ userId }) => {
  const watchIdRef = useRef(null);

  const startSharing = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        socket.emit("shareLocation", {
          userId,
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => console.error(err),
      { enableHighAccuracy: true }
    );
  };

  const stopSharing = () => {
    if (watchIdRef.current) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }

    socket.emit("stopLocation", { userId });
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      <button onClick={startSharing}>
        Share Live Location
      </button>

      <button onClick={stopSharing} style={{ marginLeft: "1rem" }}>
        Stop
      </button>
    </div>
  );
};

export default LiveLocation;
