import { useEffect } from "react";
import useLocalStorage from "use-local-storage";

export const Toggle = () => {
  const themePreference = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const [isLight, setIsLight] = useLocalStorage("light", themePreference);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isLight ? "light" : "dark"
    );
  }, [isLight]);

  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    setIsLight(!isLight);
  };
  return (
    <div className={`tdnn ${isLight ? "day" : ""}`} onClick={toggleTheme}>
      <div className={`moon ${isLight ? "sun" : ""}`}></div>
    </div>
  );
};
