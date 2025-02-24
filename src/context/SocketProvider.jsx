import { createContext, useContext, useEffect, useState } from "react";
const SocketContext = createContext();

export const useModal = () => {
  return useContext(SocketContext);
};

const SocketProvider = ({ children }) => {
  return (
    <SocketContext.Provider value={{}}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
