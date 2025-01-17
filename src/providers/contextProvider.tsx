"use client";

import React, { createContext, useState, useContext } from "react";

interface ContextType {
  openLogoMenu: boolean;
  setOpenLogoMenu: (value: boolean) => void;
  openUserMenu: boolean;
  setOpenUserMenu: (value: boolean) => void;
}

// Создаем контекст с пустыми значениями по умолчанию
const MainContext = createContext<ContextType | undefined>(undefined);

interface Props {
  children: React.ReactNode;
}

const ContextProvider = ({ children }: Props) => {
  const [openLogoMenu, setOpenLogoMenu] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);

  return (
    <MainContext.Provider
      value={{ openLogoMenu, setOpenLogoMenu, openUserMenu, setOpenUserMenu }}
    >
      {children}
    </MainContext.Provider>
  );
};

// Хук для получения контекста
export const useMainContext = () => {
  const context = useContext(MainContext);
  if (!context) {
    throw new Error("useMainContext must be used within a ContextProvider");
  }
  return context;
};

export default ContextProvider;
