import { Link } from "react-router-dom";

const DeviceCard = ({ device }) => {
  const isOnline = device.status === "online";
  
  return (
    <Link to={`/devices/${device.deviceId}`} className="group">
      <div className="relative bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1">
        
        {/* Status indicator bar */}
        <div className={`h-1.5 w-full ${isOnline ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-red-500 to-rose-500'}`} />
        
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {device.deviceId}
                </h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide font-medium">
                {device.type}
              </p>
            </div>

            <span className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide ${
              isOnline
                ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800"
                : "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800"
            }`}>
              {device.status.toUpperCase()}
            </span>
          </div>

          {/* Location */}
          <div className="flex items-start gap-2 pt-4 border-t border-slate-100 dark:border-slate-700">
            <svg className="w-4 h-4 text-slate-400 dark:text-slate-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {device.location}
            </p>
          </div>

          {/* Hover indicator */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
        </div>
      </div>
    </Link>
  );
};

export default DeviceCard;