import React from 'react'
import { FiChevronRight } from 'react-icons/fi'

const MenuCard = ({ title, icon, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="
        flex items-center justify-between w-full p-4 
        bg-white rounded-lg shadow-md border border-gray-200 
        hover:bg-blue-50 hover:border-blue-400 hover:shadow-lg 
        transition-all duration-200 cursor-pointer 
        focus:outline-none focus:ring-2 focus:ring-blue-500
      "
    >
      <div className="flex items-center">
        <div className="text-xl text-blue-600 mr-4">{icon}</div>
        <span className="text-lg font-semibold text-gray-800">{title}</span>
      </div>
      <FiChevronRight className="text-xl text-gray-400" />
    </button>
  )
}

export default MenuCard
