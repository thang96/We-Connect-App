import { createContext, useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const socket = io("https://api.holetex.com", {
  autoConnect: false,
  path: "/v1/we-connect/socket.io",
});

export const useSocketContext = () => {
  return useContext(SocketContext);
};

const SocketProvider = ({ children }) => {
  const token = useSelector((store) => store.auth.accessToken);

  useEffect(() => {
    socket.auth = { token };
    socket.connect();
    socket.on("connect", () => {
      console.log("Connected to socket server");
    });
    socket.on("disconnect", () => {
      console.log("Disconnected to socket server");
    });
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.disconnect();
    };
  }, [token]);
  return <SocketContext.Provider value={{}}>{children}</SocketContext.Provider>;
};

export default SocketProvider;
