import React, { useState } from "react";

export const Context = React.createContext();

export default function ContextProvider({ children }) {
  const [loginStatus, setLoginStatus] = useState(false);

  return (
    <Context.Provider value={{ loginStatus, setLoginStatus }}>
      {children}
    </Context.Provider>
  );
}
