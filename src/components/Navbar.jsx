import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-50 w-full">
    
      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-4 flex justify-between items-center w-full">
        
        {/* Logo Section */}
        <Link to="/" className="text-2xl font-bold text-[#1e3932] flex items-center gap-1">
          Keen<span className="text-gray-500 font-normal">Keeper</span>
        </Link>

        {/* Links Section */}
        <div className="flex items-center space-x-2 md:space-x-6 text-sm font-semibold text-gray-500">
          
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              isActive 
                ? "flex items-center gap-2 bg-[#1e3932] text-white px-3 py-2 md:px-4 rounded-md transition-colors" 
                : "flex items-center gap-2 hover:text-[#1e3932] px-3 py-2 md:px-4 transition-colors"
            }
          >
            <i className="fas fa-home"></i> <span className="hidden sm:inline">Home</span>
          </NavLink>

          <NavLink 
            to="/timeline" 
            className={({ isActive }) => 
              isActive 
                ? "flex items-center gap-2 bg-[#1e3932] text-white px-3 py-2 md:px-4 rounded-md transition-colors" 
                : "flex items-center gap-2 hover:text-[#1e3932] px-3 py-2 md:px-4 transition-colors"
            }
          >
            <i className="fas fa-clock"></i> <span className="hidden sm:inline">Timeline</span>
          </NavLink>

          <NavLink 
            to="/stats" 
            className={({ isActive }) => 
              isActive 
                ? "flex items-center gap-2 bg-[#1e3932] text-white px-3 py-2 md:px-4 rounded-md transition-colors" 
                : "flex items-center gap-2 hover:text-[#1e3932] px-3 py-2 md:px-4 transition-colors"
            }
          >
            <i className="fas fa-chart-line"></i> <span className="hidden sm:inline">Stats</span>
          </NavLink>

        </div>
      </div>
    </div>
  );
};

export default Navbar;