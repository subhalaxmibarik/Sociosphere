import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { useMemo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import socket from "./socket";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  const isAuth = Boolean(useSelector((state) => state.token));
  const userId = useSelector((state) => state.user?._id);

  const [notifications, setNotifications] = useState([]);

  // 🔔 Notifications listener
  useEffect(() => {
    socket.on("receiveNotification", (data) => {
      setNotifications((prev) => [data, ...prev]);
    });

    return () => socket.off("receiveNotification");
  }, []);

  // 📍 JOIN FRIENDS ROOM (LIVE LOCATION + FUTURE FEATURES)
  useEffect(() => {
    if (userId) {
      socket.emit("joinFriendsRoom", userId);
    }
  }, [userId]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>

      {/* 🔔 Notification UI */}
      <div className="notification-box">
        {notifications.map((n, i) => (
          <p key={i}>{n.message}</p>
        ))}
      </div>
    </div>
  );
}

export default App;
