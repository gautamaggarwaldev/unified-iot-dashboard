const Navbar = ({ onMenuClick }) => {

  return (
    <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="flex justify-between items-center px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        
        {/* Left section - Mobile menu + Title */}
        <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
          {/* Mobile menu button */}
          <button
            type="button"
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="min-w-0">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900 truncate">
              IoT Control Panel
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 hidden sm:block">
              Real-time monitoring
            </p>
          </div>
        </div>

        {/* Right section - Actions */}
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 flex-shrink-0">
          
          {/* Status indicator - hidden on mobile */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-teal-50 border border-teal-200 rounded-lg">
            <div className="relative">
              <div className="w-2 h-2 bg-teal-500 rounded-full" />
              <div className="absolute inset-0 w-2 h-2 bg-teal-500 rounded-full animate-ping" />
            </div>
            <span className="text-xs font-medium text-teal-700">
              Online
            </span>
          </div>

          {/* User avatar - hidden on small screens */}
          <div className="hidden xl:flex items-center gap-3 pl-3 border-l border-slate-200">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-white shadow-sm">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;