import { useState } from "react";

export const Toggle = () => {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    setIsDark(!isDark);
  };
  return (
    <div className={`tdnn ${isDark ? "day" : ""}`} onClick={toggleTheme}>
      <div className={`moon ${isDark ? "sun" : ""}`}></div>
    </div>
  );
};
