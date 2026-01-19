import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const Navbar = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    return null;
  }

  const { toggleTheme, theme } = themeContext;

  return (
    <div className="flex justify-between items-center bg-white dark:bg-slate-900 px-6 py-4 shadow-md">
      <h2 className="font-bold text-lg dark:text-white">
        Unified IoT Control Panel
      </h2>

      <div className="flex gap-3 items-center">
        <button
          onClick={toggleTheme}
          className="px-3 py-1 rounded-lg bg-slate-200 dark:bg-slate-700 dark:text-white hover:scale-105 transition"
        >
          {theme === "light" ? "🌙 Dark" : "☀ Light"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
