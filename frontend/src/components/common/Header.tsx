import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="bg-[#0a1929] border-b border-[#1e3a6b] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <button 
          onClick={() => navigate('/')} 
          className="flex items-baseline gap-2 bg-transparent border-none cursor-pointer px-2 py-1 rounded hover:bg-[#132f4c] transition-colors"
        >
          <span className="text-xl font-semibold text-blue-400">Portal</span>
          <span className="text-xl font-semibold text-white">Company Incorporation</span>
        </button>

        <nav className="flex items-center gap-4">
          <button
            onClick={() => navigate('/companies')}
            className={`px-4 py-2 rounded text-sm font-medium transition-all border-none cursor-pointer ${
              location.pathname === '/companies' || location.pathname.startsWith('/companies/')
                ? 'bg-[#1e3a6b] text-white font-semibold' 
                : 'bg-transparent text-white hover:bg-[#132f4c]'
            }`}
          >
            Companies
          </button>
          <div className="w-px h-6 bg-[#1e3a6b]" />
          <button
            onClick={() => navigate('/companies/new')}
            className="px-4 py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 hover:-translate-y-px hover:shadow-lg transition-all border-none cursor-pointer"
          >
            + New Company
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;