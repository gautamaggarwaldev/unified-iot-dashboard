import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: "📊" },
    { name: "Devices", path: "/devices", icon: "📡" }
  ];

  return (
    <div className="w-64 min-h-screen hidden md:block bg-gradient-to-b from-slate-900 to-slate-800 text-white p-6">

      <h2 className="text-2xl font-bold text-blue-400 mb-10">
        IoT Enterprise
      </h2>

      <div className="space-y-3">
        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 p-3 rounded-lg transition
            ${
              location.pathname === item.path
                ? "bg-blue-600 shadow-lg"
                : "hover:bg-slate-700"
            }`}
          >
            <span>{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </div>

    </div>
  );
};

export default Sidebar;
