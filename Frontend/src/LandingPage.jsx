import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiShield } from 'react-icons/fi';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-600 to-indigo-800 flex flex-col justify-center items-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-bold text-white">Welcome to National Bank</h1>
        <p className="text-xl text-blue-200 mt-4">Your trusted partner in modern banking.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Customer Card */}
        <div
          onClick={() => navigate('/login')}
          className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-lg w-72 text-center text-white border border-white/20 hover:bg-white/20 transition-all cursor-pointer"
        >
          <FiUser className="mx-auto text-5xl text-blue-300" />
          <h2 className="text-2xl font-semibold mt-4">Customer</h2>
          <p className="text-blue-200 mt-2">Access your accounts, view transactions, and manage your finances.</p>
          <button
            className="mt-6 w-full px-6 py-3 font-semibold bg-blue-500 rounded-lg hover:bg-blue-400 transition-colors"
            onClick={(e) => { e.stopPropagation(); navigate('/login'); }}
          >
            Login or Sign Up
          </button>
        </div>

        {/* Admin Card */}
        <div
          onClick={() => navigate('/login/admin')}
          className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-lg w-72 text-center text-white border border-white/20 hover:bg-white/20 transition-all cursor-pointer"
        >
          <FiShield className="mx-auto text-5xl text-blue-300" />
          <h2 className="text-2xl font-semibold mt-4">Admin</h2>
          <p className="text-blue-200 mt-2">Manage customer accounts, branches, and system operations.</p>
          <button
            className="mt-6 w-full px-6 py-3 font-semibold bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
            onClick={(e) => { e.stopPropagation(); navigate('/login/admin'); }}
          >
            Admin Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
