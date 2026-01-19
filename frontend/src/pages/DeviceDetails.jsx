import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
} from "recharts";

const DeviceDetails = () => {
  const { id } = useParams();

  const [device, setDevice] = useState(null);
  const [telemetry, setTelemetry] = useState([]);

  useEffect(() => {
    const fetchDevice = async () => {
      const res = await API.get(`/devices/${id}`);
      setDevice(res.data);
    };

    const fetchTelemetry = async () => {
      const res = await API.get(`/telemetry/${id}`);

      // Reverse for chart (oldest → newest)
      setTelemetry(res.data.reverse().slice(-20));
    };

    fetchDevice();
    fetchTelemetry();
  }, [id]);

  if (!device) return null;

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-6">
          <h2 className="text-xl font-bold dark:text-white">Device Details</h2>

          {/* Device Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
            <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow">
              <p className="dark:text-gray-300">Device ID</p>
              <h3 className="font-bold dark:text-white">{device.deviceId}</h3>
            </div>

            <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow">
              <p className="dark:text-gray-300">Status</p>
              <h3 className="font-bold dark:text-white">{device.status}</h3>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow mt-8">
            <h3 className="font-bold mb-2 dark:text-white">
              Telemetry History
            </h3>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={telemetry}>
                <XAxis dataKey="timestamp" hide />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  strokeWidth={2}
                  isAnimationActive={true}
                  animationDuration={800}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceDetails;
