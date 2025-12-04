import { Menu, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleMore = () => setIsMoreOpen(!isMoreOpen);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Latest Job', href: '#latest-job' },
    { name: 'Admit Card', href: '#admit-card' },
    { name: 'Result', href: '#result' },
    { name: 'Admission', href: '#admission' },
    { name: 'Syllabus', href: '#syllabus' },
    { name: 'Answer Key', href: '#answer-key' },
  ];

  const moreItems = [
    { name: 'Contact Us', href: '#contact' },
    { name: 'Privacy', href: '#privacy' },
    { name: 'Disclaimer', href: '#disclaimer' },
  ];

  return (
    <nav className="bg-gradient-to-r from-orange-600 to-red-600 shadow-md sticky top-0 z-50 ">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-14">
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1 w-full justify-center">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-white font-semibold px-4 py-2 rounded-md hover:bg-red-800 hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105"
              >
                {item.name}
              </a>
            ))}
            
            {/* More Dropdown */}
            <div className="relative">
              <button
                onClick={toggleMore}
                className="text-white font-semibold px-4 py-2 rounded-md hover:bg-red-800 hover:bg-opacity-20 transition-all duration-300 flex items-center gap-1"
              >
                More
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isMoreOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isMoreOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50">
                  {moreItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-2 text-gray-800 hover:bg-orange-100 transition-colors duration-200 font-medium"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden text-white p-2 rounded-md hover:bg-white hover:bg-opacity-20 transition-all duration-300"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          
          <div className="lg:hidden text-white font-bold text-lg">
            Naukari Store
          </div>
          <div className="lg:hidden w-8"></div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden pb-4 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block text-white font-semibold px-4 py-2 rounded-md hover:bg-white hover:bg-opacity-20 transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
            
            <div className="border-t border-white border-opacity-30 pt-2 mt-2">
              <div className="text-white font-bold px-4 py-2 text-sm opacity-75">
                MORE OPTIONS
              </div>
              {moreItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-white font-semibold px-4 py-2 rounded-md hover:bg-white hover:bg-opacity-20 transition-all duration-300 pl-8"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar