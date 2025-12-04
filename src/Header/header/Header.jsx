import React, { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

// Header Component
const Header = () => {
  return (
    <div className="bg-gradient-to-r from-green-600 to-green-700 text-white  py-4 px-4 shadow-lg ">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-4xl font-bold tracking-wide">
            Naukari Store
          </h1>
          <p className="text-xl md:text-2xl font-semibold mt-1">
            नौकरी स्टोर
          </p>
        </div>
        <div className="hidden md:block">
          <img 
            src="https://www.naukaristore.com/images/digital-india.png" 
            alt="Digital India" 
            className="h-16 w-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Header