const Loader = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[1, 2, 3].map(i => (
        <div
          key={i}
          className="h-28 bg-gray-300 dark:bg-slate-700 rounded-xl animate-pulse"
        />
      ))}
    </div>
  );
};

export default Loader;
