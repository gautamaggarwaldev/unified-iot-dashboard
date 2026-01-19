import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const themeContext = useContext(ThemeContext);
  
  if (!themeContext) {
    return null;
  }

  const { toggleTheme, theme } = themeContext;

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
    toast.success("Logged out");
  };

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

        <button
          onClick={logout}
          className="px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600 hover:scale-105 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
