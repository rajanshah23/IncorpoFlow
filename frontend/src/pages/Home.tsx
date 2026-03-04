import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-[#0a1929] mb-4">
        Welcome to Company Incorporation
      </h1>
      <p className="text-xl text-[#1e3a6b] mb-8">
        Easily register and manage companies and their shareholders
      </p>
      
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => navigate('/companies')}
          className="px-6 py-3 bg-[#0a1929] text-white rounded-lg hover:bg-[#132f4c] transition-colors border border-[#1e3a6b]"
        >
          View Companies
        </button>
        <button
          onClick={() => navigate('/companies/new')}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
        >
          Create New Company
        </button>
      </div>

      <div className="mt-16 grid md:grid-cols-3 gap-8">
        <div className="p-6 bg-white rounded-lg shadow-md border-l-4 border-[#0a1929]">
          <h3 className="text-lg font-semibold mb-2 text-[#0a1929]">Step 1: Create Company</h3>
          <p className="text-gray-600">
            Enter company details including name, number of shareholders, and total capital
          </p>
        </div>
        
        <div className="p-6 bg-white rounded-lg shadow-md border-l-4 border-[#0a1929]">
          <h3 className="text-lg font-semibold mb-2 text-[#0a1929]">Step 2: Add Shareholders</h3>
          <p className="text-gray-600">
            Add shareholder information matching the number specified
          </p>
        </div>
        
        <div className="p-6 bg-white rounded-lg shadow-md border-l-4 border-[#0a1929]">
          <h3 className="text-lg font-semibold mb-2 text-[#0a1929]">Step 3: Manage</h3>
          <p className="text-gray-600">
            View, edit, or delete companies and their shareholders
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;