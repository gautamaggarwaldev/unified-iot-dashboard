import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart
} from "recharts";

const DeviceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [device, setDevice] = useState(null);
  const [telemetry, setTelemetry] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchDevice = async () => {
      try {
        const res = await API.get(`/devices/${id}`);
        setDevice(res.data);
      } catch (error) {
        console.error("Failed to fetch device", error);
      }
    };

    const fetchTelemetry = async () => {
      try {
        const res = await API.get(`/telemetry/${id}`);
        // Reverse for chart (oldest → newest)
        setTelemetry(res.data.reverse().slice(-20));
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch telemetry", error);
        setLoading(false);
      }
    };

    fetchDevice();
    fetchTelemetry();
  }, [id]);

  if (!device) {
    return (
      <div className="flex bg-slate-50 dark:bg-slate-950 min-h-screen">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 flex flex-col min-w-0">
          <Navbar onMenuClick={() => setSidebarOpen(true)} />
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">Loading device...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isOnline = device.status === "online";

  return (
    <div className="flex bg-slate-50 dark:bg-slate-950 min-h-screen">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />

        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          
          {/* Back button and page header */}
          <div className="mb-6 sm:mb-8">
            <button
              onClick={() => navigate("/devices")}
              className="group flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 mb-4 transition-colors"
            >
              <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm sm:text-base font-medium">Back to Devices</span>
            </button>

            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">
                  Device Details
                </h2>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
                  Monitor device status and telemetry history
                </p>
              </div>

              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold w-fit ${
                isOnline
                  ? "bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400 border border-teal-200 dark:border-teal-800"
                  : "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800"
              }`}>
                <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-teal-500 animate-pulse' : 'bg-amber-500'}`} />
                <span className="text-sm sm:text-base">{device.status.toUpperCase()}</span>
              </div>
            </div>
          </div>

          {/* Device Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 mb-6 sm:mb-8">
            <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 sm:p-5 lg:p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">Device ID</p>
              </div>
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-slate-900 dark:text-white truncate">{device.deviceId}</h3>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 sm:p-5 lg:p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">Type</p>
              </div>
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-slate-900 dark:text-white truncate">{device.type}</h3>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 sm:p-5 lg:p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-cyan-100 dark:bg-cyan-900/40 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-600 dark:text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">Location</p>
              </div>
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-slate-900 dark:text-white line-clamp-2">{device.location}</h3>
            </div>

            <div className={`rounded-lg border p-4 sm:p-5 lg:p-6 ${
              isOnline 
                ? "bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800" 
                : "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800"
            }`}>
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  isOnline 
                    ? "bg-teal-100 dark:bg-teal-900/40" 
                    : "bg-amber-100 dark:bg-amber-900/40"
                }`}>
                  <svg className={`w-5 h-5 sm:w-6 sm:h-6 ${isOnline ? "text-teal-600 dark:text-teal-400" : "text-amber-600 dark:text-amber-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    {isOnline ? (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    )}
                  </svg>
                </div>
                <p className={`text-xs sm:text-sm font-medium ${isOnline ? "text-teal-700 dark:text-teal-400" : "text-amber-700 dark:text-amber-400"}`}>
                  Status
                </p>
              </div>
              <h3 className={`text-base sm:text-lg lg:text-xl font-bold ${isOnline ? "text-teal-700 dark:text-teal-400" : "text-amber-700 dark:text-amber-400"}`}>
                {device.status.charAt(0).toUpperCase() + device.status.slice(1)}
              </h3>
            </div>
          </div>

          {/* Telemetry Chart */}
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 sm:p-6 lg:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-1">
                  Telemetry History
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Last 20 readings from this device
                </p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg w-fit">
                <svg className="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
                <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-400">Analytics</span>
              </div>
            </div>

            {loading ? (
              <div className="h-64 sm:h-80 lg:h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Loading telemetry...</p>
                </div>
              </div>
            ) : telemetry.length > 0 ? (
              <ResponsiveContainer width="100%" height={window.innerWidth < 640 ? 300 : window.innerWidth < 1024 ? 350 : 400}>
                <AreaChart data={telemetry}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-700" />
                  <XAxis 
                    dataKey="timestamp" 
                    tick={{ fill: '#64748b', fontSize: window.innerWidth < 640 ? 10 : 12 }}
                    stroke="#cbd5e1"
                  />
                  <YAxis 
                    tick={{ fill: '#64748b', fontSize: window.innerWidth < 640 ? 10 : 12 }}
                    stroke="#cbd5e1"
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      fontSize: '14px'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#14b8a6"
                    strokeWidth={3}
                    fill="url(#colorValue)"
                    isAnimationActive={true}
                    animationDuration={1000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-64 sm:h-80 lg:h-96 flex flex-col items-center justify-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 sm:w-8 sm:h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h4 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  No telemetry data available
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 text-center max-w-md px-4">
                  This device hasn't sent any telemetry data yet. Data will appear here once the device starts transmitting.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceDetails;