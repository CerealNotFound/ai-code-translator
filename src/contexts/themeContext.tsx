"use client";

import { createContext, useState } from "react";

export const ThemeContext = createContext({
  theme: "tokyoNight",
  setTheme: (theme: string) => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState("tokyoNight");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
