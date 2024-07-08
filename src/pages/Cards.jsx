import React from 'react';




const Card = ({ title, subtitle, gradient, creador, 
  description, 
  duration}) => {
  return (
    <div className={`p-6 rounded-lg shadow-2xl text-white relative overflow-hidden ${gradient}`}>
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-10">
        
      </div>
      <div className="relative z-10">
        <h1 className="text-2xl font-bold mb-2">{title}</h1>
        <p className="text-lg mb-4">{subtitle}</p>
        <p className="text-lg mb-4">{creador}</p>
        <p className="text-lg mb-4">{description}</p>
        <p className="text-lg mb-4">{duration}</p>
      </div>
    </div>
  );
};

export default Card;