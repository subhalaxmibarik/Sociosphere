import { io } from "socket.io-client";

const SOCKET_URL = "https://sociosphere-6ykl.onrender.com"; // HTTPS
const socket = io(SOCKET_URL, { transports: ["websocket"] });

export default socket;
