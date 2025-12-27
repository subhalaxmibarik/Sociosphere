import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import LiveMap from "components/LiveMap";
import socket from "socket"; // make sure this path is correct

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);

  // 📍 FRIEND LIVE LOCATION STATE
  const [friendLat, setFriendLat] = useState(null);
  const [friendLng, setFriendLng] = useState(null);

  // 📡 LISTEN FOR FRIEND LOCATION
  useEffect(() => {
    const handleLocation = ({ lat, lng }) => {
      console.log("Received friend's location:", lat, lng);
      setFriendLat(lat);
      setFriendLng(lng);
    };

    const handleStop = () => {
      setFriendLat(null);
      setFriendLng(null);
    };

    socket.on("receiveLocation", handleLocation);
    socket.on("stopLocation", handleStop);

    return () => {
      socket.off("receiveLocation", handleLocation);
      socket.off("stopLocation", handleStop);
    };
  }, []);

  return (
    <Box>
      <Navbar />

      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        {/* LEFT */}
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>

        {/* CENTER FEED */}
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {/* 📍 FRIEND LIVE MAP */}
          {friendLat && friendLng ? (
            <Box mb="1rem" height="400px">
              <LiveMap lat={friendLat} lng={friendLng} />
            </Box>
          ) : (
            <Box mb="1rem">No live location yet</Box>
          )}

          <MyPostWidget picturePath={picturePath} />
          <Box m="1rem 0" />
          <PostsWidget userId={_id} />
        </Box>

        {/* RIGHT */}
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0" />
            <FriendListWidget userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
