import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";
import DeviceCard from "../components/DeviceCard";
import Loader from "../components/Loader";

const Devices = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDevices = async () => {
    try {
      const res = await API.get("/devices");

      const data = Array.isArray(res.data) ? res.data : [];

      setDevices(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch devices", error);
      setDevices([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchDevices();
    };
    fetchData();
  }, []);

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-6">
          <h2 className="text-xl font-bold mb-4 dark:text-white">
            Connected Devices
          </h2>
          {loading ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Array.isArray(devices) && devices.map((device) => (
                <DeviceCard key={device._id} device={device} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Devices;
