import { io } from "socket.io-client";

// import { dotenv } from "dotenv";
// dotenv.config();

// "undefined" means the URL will be computed from the `window.location` object
//const URL = process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000";

// let targetUrl;

// if (process.env.NEXT_ENV === "production") {
//   targetUrl = "https://polyade-meta.azurewebsites.net";
// } else {
//   targetUrl = "http://localhost:3000";
// }

const URL =
  process.env.NODE_ENV === "production"
    ? undefined // "https://polyade-meta.azurewebsites.net"
    : "http://localhost:3000";

// The autoConnect option is set to false because we don’t want the socket to connect to the server immediately.
// By default, the Socket.IO client opens a connection to the server right away. You can prevent this behavior with the autoConnect option:
//export const socket = io(URL, {
export const socket = io(undefined as any, {
  autoConnect: false,
  path: "/comm/",
});
