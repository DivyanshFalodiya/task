import { createContext, useState } from "react";

// Theme Context
export const ThemeModeContext = createContext();

const themes = ["dark", "light"];

// Helper Function
const getTheme = () => {
  const th = localStorage.getItem("theme");
  if (themes.includes(th)) return th;
  return themes[0];
};

// Theme Context Provider
export const ThemeModeProvider = ({ children }) => {
  const [mode, setMode] = useState(getTheme());

  const changeMode = () => {
    setMode((prev) => {
      const newTheme = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  return (
    <ThemeModeContext.Provider value={[mode, changeMode]}>
      {children}
    </ThemeModeContext.Provider>
  );
};
