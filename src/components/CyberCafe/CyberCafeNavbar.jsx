import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Monitor, Image, LayoutDashboard, LogIn, UserPlus, LogOut, Menu, X, Home } from "lucide-react";

const CyberCafeNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, [location.pathname]);

  const checkAuthStatus = () => {
    const token = localStorage.getItem("cyberCafeToken");
    const user = localStorage.getItem("cyberCafeUser");

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const isExpired = payload.exp * 1000 < Date.now();

        if (!isExpired) {
          setIsLoggedIn(true);
          if (user) {
            const userData = JSON.parse(user);
            setUserName(userData.cafeName || userData.ownerName || "Cafe");
          }
        } else {
          handleLogout();
        }
      } catch (e) {
        handleLogout();
      }
    } else {
      setIsLoggedIn(false);
      setUserName("");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("cyberCafeToken");
    localStorage.removeItem("cyberCafeUser");
    setIsLoggedIn(false);
    setUserName("");
    navigate("/cyber-cafe/login");
  };

  const isActive = (path) => location.pathname === path;

  const navLinkClass = (path) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
      isActive(path)
        ? "bg-white text-purple-700 shadow-md"
        : "text-white hover:bg-white/20"
    }`;

  return (
    <nav className="bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/cyber-cafe" className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-lg">
              <Monitor className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-white font-bold text-xl hidden sm:block">
              Cyber Cafe Portal
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <Link to="/" className={navLinkClass("/")}>
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>

            {isLoggedIn ? (
              <>
                <Link to="/cyber-cafe/dashboard" className={navLinkClass("/cyber-cafe/dashboard")}>
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>
                <Link to="/cyber-cafe/image-tool" className={navLinkClass("/cyber-cafe/image-tool")}>
                  <Image className="w-4 h-4" />
                  <span>Image Tool</span>
                </Link>
                <div className="flex items-center gap-3 ml-4 pl-4 border-l border-white/30">
                  <span className="text-white/90 text-sm">
                    Welcome, <strong>{userName}</strong>
                  </span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/cyber-cafe/login" className={navLinkClass("/cyber-cafe/login")}>
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </Link>
                <Link to="/cyber-cafe/signup" className={navLinkClass("/cyber-cafe/signup")}>
                  <UserPlus className="w-4 h-4" />
                  <span>Register</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/20 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-white hover:bg-white/20 rounded-lg transition-colors"
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </Link>

            {isLoggedIn ? (
              <>
                <Link
                  to="/cyber-cafe/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-white hover:bg-white/20 rounded-lg transition-colors"
                >
                  <LayoutDashboard className="w-5 h-5" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  to="/cyber-cafe/image-tool"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-white hover:bg-white/20 rounded-lg transition-colors"
                >
                  <Image className="w-5 h-5" />
                  <span>Image Tool</span>
                </Link>
                <div className="border-t border-white/30 pt-2 mt-2">
                  <div className="px-4 py-2 text-white/80 text-sm">
                    Logged in as: <strong>{userName}</strong>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-3 text-white hover:bg-red-500/50 rounded-lg transition-colors w-full"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/cyber-cafe/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-white hover:bg-white/20 rounded-lg transition-colors"
                >
                  <LogIn className="w-5 h-5" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/cyber-cafe/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-white hover:bg-white/20 rounded-lg transition-colors"
                >
                  <UserPlus className="w-5 h-5" />
                  <span>Register</span>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default CyberCafeNavbar;
