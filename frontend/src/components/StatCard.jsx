import CountUp from "react-countup";

const StatCard = ({ title, value, icon }) => {
  // Determine gradient and colors based on title
  const getCardStyle = (title) => {
    if (title.includes("Total")) {
      return {
        gradient: "from-blue-500 to-indigo-600",
        bg: "bg-blue-50 dark:bg-blue-900/20",
        border: "border-blue-200 dark:border-blue-800",
        iconBg: "bg-blue-100 dark:bg-blue-900/40",
        iconColor: "text-blue-600 dark:text-blue-400"
      };
    } else if (title.includes("Online")) {
      return {
        gradient: "from-green-500 to-emerald-600",
        bg: "bg-green-50 dark:bg-green-900/20",
        border: "border-green-200 dark:border-green-800",
        iconBg: "bg-green-100 dark:bg-green-900/40",
        iconColor: "text-green-600 dark:text-green-400"
      };
    } else {
      return {
        gradient: "from-purple-500 to-pink-600",
        bg: "bg-purple-50 dark:bg-purple-900/20",
        border: "border-purple-200 dark:border-purple-800",
        iconBg: "bg-purple-100 dark:bg-purple-900/40",
        iconColor: "text-purple-600 dark:text-purple-400"
      };
    }
  };

  const style = getCardStyle(title);

  return (
    <div className={`relative group bg-white dark:bg-slate-800 rounded-2xl border ${style.border} overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1`}>
      
      {/* Gradient bar */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${style.gradient}`} />

      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
              {title}
            </p>
            <p className="text-4xl font-bold text-slate-900 dark:text-white tabular-nums">
              <CountUp end={value} duration={2} separator="," />
            </p>
          </div>

          {/* Icon container */}
          <div className={`w-14 h-14 rounded-xl ${style.iconBg} flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}>
            <span className={`text-3xl ${style.iconColor}`}>{icon}</span>
          </div>
        </div>

        {/* Progress bar or indicator */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 dark:text-slate-400">Activity</span>
            <span className={`font-semibold ${style.iconColor}`}>Live</span>
          </div>
          <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <div className={`h-full bg-gradient-to-r ${style.gradient} rounded-full transition-all duration-1000 ease-out`} style={{ width: '75%' }} />
          </div>
        </div>
      </div>

      {/* Shine effect on hover */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
};

export default StatCard;