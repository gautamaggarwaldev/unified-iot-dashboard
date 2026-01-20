/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import socket from "../services/socket";
import API from "../services/api";
import StatCard from "../components/StatCard";
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
    <div className="flex bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 min-h-screen">
      
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">
        
        {/* TOP NAV */}
        <Navbar />

        {/* PAGE CONTENT */}
        <div className="flex-1 p-8 overflow-auto">
          
          {/* Page header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Dashboard Overview
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Monitor your IoT infrastructure in real-time
            </p>
          </div>

          {/* SYSTEM STATUS BANNER */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-6 shadow-2xl shadow-blue-500/20"
          >
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-blue-100 font-medium">System Status</p>
                  <h3 className="text-xl font-bold text-white">All services running normally</h3>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-white">Live</span>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24" />
          </motion.div>

          {/* KPI CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <StatCard
                title="Total Devices"
                value={Array.isArray(devices) ? devices.length : 0}
                icon="📡"
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <StatCard
                title="Online Devices"
                value={onlineDevices}
                icon="✅"
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <StatCard
                title="Live Events"
                value={telemetry.length}
                icon="⚡"
              />
            </motion.div>
          </div>

          {/* LIVE FEED SECTION */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                Live Telemetry Stream
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Real-time data from connected devices
              </p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-xs font-semibold text-red-700 dark:text-red-400">STREAMING</span>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="h-40 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.isArray(telemetry) && telemetry.length > 0 ? (
                telemetry.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300"
                  >
                    {/* Gradient accent */}
                    <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
                    
                    <div className="p-6">
                      {/* Header */}
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          <p className="font-bold text-slate-900 dark:text-white">
                            {item.deviceId}
                          </p>
                        </div>
                        <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg animate-pulse">
                          LIVE
                        </span>
                      </div>

                      {/* Metric */}
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                        {item.metric}
                      </p>

                      {/* Value */}
                      <div className="flex items-baseline gap-2">
                        <p className="text-3xl font-bold text-slate-900 dark:text-white">
                          {item.value}
                        </p>
                        <span className="text-lg text-slate-500 dark:text-slate-400">
                          {item.unit}
                        </span>
                      </div>

                      {/* Timestamp indicator */}
                      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Just now</span>
                      </div>
                    </div>

                    {/* Hover effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-16 px-4">
                  <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                    <svg className="w-10 h-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    No telemetry data yet
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 text-center max-w-md">
                    Waiting for devices to send telemetry updates. Data will appear here in real-time.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;