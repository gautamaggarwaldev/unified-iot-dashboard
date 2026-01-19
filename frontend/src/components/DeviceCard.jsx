import { Link } from "react-router-dom";

const DeviceCard = ({ device }) => {
  return (
    <Link to={`/devices/${device.deviceId}`}>
      <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow hover:shadow-xl transition hover:-translate-y-1">
        <div className="flex justify-between items-center">
          <h3 className="font-bold dark:text-white">{device.deviceId}</h3>

          <span
            className={`px-3 py-1 rounded-full text-xs ${
              device.status === "online"
                ? "bg-green-500 text-white pulse-online"
                : "bg-red-500 text-white"
            }`}
          >
            {device.status}
          </span>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-300 mt-2">
          {device.type}
        </p>

        <p className="text-sm text-gray-500 dark:text-gray-300">
          {device.location}
        </p>
      </div>
    </Link>
  );
};

export default DeviceCard;
