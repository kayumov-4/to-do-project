import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

const ThemeContextWrapper = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextWrapper;
