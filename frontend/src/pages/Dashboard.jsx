import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import socket from "../services/socket";
import API from "../services/api";
import StatCard from "../components/StatCard";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Dashboard = () => {
  const [telemetry, setTelemetry] = useState([]);
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch devices on load
  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const res = await API.get("/devices");
        setDevices(res.data);
        setLoading(false);
      } catch {
        console.error("Failed to fetch devices");
        setLoading(false);
      }
    };

    fetchDevices();

    // Socket listener
    socket.on("telemetry-update", (data) => {
      setTelemetry((prev) => [data, ...prev.slice(0, 8)]);
    });

    return () => {
      socket.off("telemetry-update");
    };
  }, []);

  const onlineDevices = Array.isArray(devices)
  ? devices.filter((device) => device.status === "online").length
  : 0;

  return (
    <div className="flex bg-slate-100 dark:bg-slate-900 min-h-screen">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">

        {/* TOP NAV */}
        <Navbar />

        {/* SYSTEM STATUS BAR */}
        <div className="bg-linear-to-r from-blue-600 to-indigo-600 text-white p-4 mx-6 mt-4 rounded-xl shadow">

          <p className="text-sm opacity-80">
            System Status
          </p>

          <h3 className="text-lg font-bold">
            All services running normally 🚀
          </h3>

        </div>

        {/* PAGE CONTENT */}
        <div className="p-6">

          {/* KPI CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

            <StatCard
              title="Total Devices"
              value={Array.isArray(devices) ? devices.length : 0}
              icon="📡"
            />

            <StatCard
              title="Online Devices"
              value={onlineDevices}
              icon="✅"
            />

            <StatCard
              title="Live Events"
              value={telemetry.length}
              icon="⚡"
            />

          </div>

          {/* LIVE FEED SECTION */}
          <h3 className="font-bold text-lg mb-4 dark:text-white">
            Live Telemetry Stream
          </h3>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-28 bg-gray-300 dark:bg-slate-700 rounded-xl animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

              {Array.isArray(telemetry) && telemetry.map((item, index) => (

                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow hover:shadow-lg transition"
                >

                  <div className="flex justify-between items-center mb-2">
                    <p className="font-semibold dark:text-white">
                      {item.deviceId}
                    </p>

                    <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                      LIVE
                    </span>
                  </div>

                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    {item.metric}
                  </p>

                  <p className="text-xl font-bold mt-1 dark:text-white">
                    {item.value} {item.unit}
                  </p>

                </motion.div>

              ))}

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
