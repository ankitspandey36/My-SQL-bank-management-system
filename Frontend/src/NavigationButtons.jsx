import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FiHome, FiArrowLeft } from 'react-icons/fi'

const NavigationButtons = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  return (
    <div className="fixed top-4 left-4 z-50 flex flex-col gap-2">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        disabled={isHomePage}
        className={`
          flex items-center justify-center px-4 py-2 font-semibold rounded-lg shadow-md 
          transition-all duration-300 
          ${isHomePage 
            ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
            : 'bg-white text-gray-700 hover:bg-gray-200'}
        `}
      >
        <FiArrowLeft className="mr-2" />
        Back
      </button>

      {/* Home Button */}
      <button
        onClick={() => navigate('/')}
        className="
          flex items-center justify-center px-4 py-2 font-semibold rounded-lg shadow-md 
          transition-all duration-300 bg-blue-600 text-white hover:bg-blue-700
        "
      >
        <FiHome className="mr-2" />
        Home
      </button>
    </div>
  )
}

export default NavigationButtons
