import { Link } from "react-router-dom";

// Header Component
const Header = () => {
  return (
    <div className="bg-[rgb(0,142,228)] text-white py-4 px-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex flex-col">
          <Link to='/'>
          <h1 className="text-3xl lg:text-3xl md:text-2xl sm:text-xl font-bold tracking-wide">
            Naukari Store
          </h1></Link>
         <Link to='/'> <p className="text-xl lg:text-xl md:text-lg sm:text-base font-semibold mt-1">
            नौकरी स्टोर
          </p>
          </Link>
        </div>
        
      </div>
    </div>
  );
};

export default Header;