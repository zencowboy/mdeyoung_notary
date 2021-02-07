import { useState } from "react";
import React, { useState } from "react";

export const Context = React.createContext();

export default function ContextProvider(children) {
  return <Context.Provider value={}>{children}</Context.Provider>;
}
