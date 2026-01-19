import CountUp from "react-countup";

const StatCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-md hover:shadow-xl transition">
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm text-gray-500 dark:text-gray-300">{title}</p>
        <span className="text-xl">{icon}</span>
      </div>

      <p className="text-3xl font-bold dark:text-white">
        <CountUp end={value} duration={1} />
      </p>
    </div>
  );
};

export default StatCard;
