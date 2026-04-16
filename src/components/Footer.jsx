import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#1e3932] text-gray-300 py-12 mt-auto w-full border-t-4 border-blue-500">
    
      <div className="max-w-6xl mx-auto px-4 lg:px-8 flex flex-col items-center text-center w-full">
        
        <h2 className="text-4xl font-bold text-white mb-3">
          Keen<span className="text-gray-300 font-normal">Keeper</span>
        </h2>
        <p className="text-sm text-gray-400 mb-8 max-w-md">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>

        <div className="mb-10">
          <h4 className="text-white font-semibold mb-4 text-sm">Social Links</h4>
          <div className="flex gap-4 justify-center">
            <a href="#" className="w-10 h-10 bg-white text-[#1e3932] hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors shadow-sm">
              <i className="fa-brands fa-instagram text-lg"></i>
            </a>
            <a href="#" className="w-10 h-10 bg-white text-[#1e3932] hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors shadow-sm">
              <i className="fa-brands fa-facebook text-lg"></i>
            </a>
            <a href="#" className="w-10 h-10 bg-white text-[#1e3932] hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors shadow-sm">
              <i className="fa-brands fa-x-twitter text-lg"></i>
            </a>
          </div>
        </div>

        <div className="w-full border-t border-gray-700/50 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 gap-4">
          <p>&copy; {new Date().getFullYear()} KeenKeeper. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;