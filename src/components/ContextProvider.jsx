// src/components/ContextProvider.jsx
import React, { createContext, useContext, useState } from "react";

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const startLoading = (message, duration) => {
    setLoading(true);
    // maybe show message or timeout, etc.
  };

  const stopLoading = () => {
    setLoading(false);
  };

  return (
    <LoadingContext.Provider value={{ loading, startLoading, stopLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
