import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLogIn, FiUserPlus } from 'react-icons/fi';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-800">
          National Bank
        </h1>
        <p className="text-gray-600 mt-2">Your Secure and Simple Banking Solution</p>
      </div>

      <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800">Welcome</h2>
          <p className="text-gray-500">Please choose an option to continue.</p>
        </div>

        <div className="flex flex-col gap-4">
          {/* Login Button */}
          <button 
            onClick={() => navigate('/login')}
            className="flex items-center justify-center w-full px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
          >
            <FiLogIn className="mr-3" />
            Login
          </button>
          
          {/* Signup Button */}
          <button 
            onClick={() => navigate('/signup/customer')}
            className="flex items-center justify-center w-full px-6 py-3 text-lg font-semibold text-blue-700 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors"
          >
            <FiUserPlus className="mr-3" />
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
