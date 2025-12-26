import { useEffect, useState } from "react";
import socket from "../socket";
import { Box, Typography } from "@mui/material";

const LiveMap = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    socket.on("receiveLocation", (data) => {
      setLocation(data);
    });

    socket.on("locationStopped", () => {
      setLocation(null);
    });

    return () => {
      socket.off("receiveLocation");
      socket.off("locationStopped");
    };
  }, []);

  if (!location) return null;

  return (
    <Box
      mt="1.5rem"
      p="1rem"
      borderRadius="0.75rem"
      bgcolor="#fff"
      boxShadow={2}
    >
      <Typography fontWeight="600" mb="0.5rem">
        Friend is sharing live location
      </Typography>

      <iframe
       title="Friend Live Location"
       src={`https://www.google.com/maps?q=${location.lat},${location.lng}&z=15&output=embed`}
       width="100%"
       height="300"
       style={{ borderRadius: "10px", border: "none" }}
       loading="lazy"
      />
    </Box>
  );
};

export default LiveMap;
