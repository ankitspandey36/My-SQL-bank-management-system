import React from 'react';

const Button = ({ text, onClick, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="
        w-full
        px-6 
        py-3 
        text-lg 
        font-semibold 
        text-white 
        bg-blue-600 
        rounded-lg 
        shadow-md 
        hover:bg-blue-700 
        focus:outline-none 
        focus:ring-2 
        focus:ring-blue-500 
        focus:ring-opacity-50 
        transition-colors 
        disabled:bg-blue-300
        disabled:cursor-not-allowed
      "
    >
      {text}
    </button>
  );
};

export default Button;
