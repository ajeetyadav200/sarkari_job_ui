import { Instagram, LucideYoutube } from 'lucide-react'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white mt-12">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid md:grid-cols-3 gap-6 items-center">
          {/* About Section */}
          <div className="text-center md:text-left">
            <Link to='/'>
            <h3 className="text-2xl font-bold text-[rgb(0,142,228)]">
              Naukari Store
            </h3></Link>
            <Link to='/'>
            <p className="text-lg text-gray-300 mt-1">नौकरी स्टोर</p>
            </Link>
            <div className="mt-3 flex gap-3 justify-center md:justify-start">
              <a 
                href="https://www.facebook.com/Naukaristores?rdid=vb3U3uXRO5VWJnlE&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1AvgKkTMYE%2F#" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700  hover:scale-110
                    transition-all duration-300"
              >
                <span>f</span>
              </a>
              <a 
                href="https://x.com/naukaristore?fbclid=IwY2xjawPQqUdleHRuA2FlbQIxMABicmlkETF5aUdVWVZrSldWbjVYamh4c3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHr_qzaWthZEQQ11GyJMo7jlXiiaEbGAtE5PgF0VbQxoQl_CZVpM5la90VNxU_aem_8S5YstfGdMeW5hGRtViJQQ" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-black rounded-full flex items-center justify-center hover:bg-black hover:scale-110 transition-all duration-300"
              >
                <span>𝕏</span>
              </a>
              <a 
                href="https://www.instagram.com/naukaristore?fbclid=IwY2xjawPQpQJleHRuA2FlbQIxMABicmlkETF5aUdVWVZrSldWbjVYamh4c3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHhGo7ow_KNzoRzaJLLwd_jBxyDubDHyG7d-vrgqUOodZ1o5fkAH-FfY4pgzH_aem_9vfEGxZAVUulq5EEOVPk4Q" 
                target="_blank"
                rel="noopener noreferrer"
               className="w-8 h-8 
                    rounded-full 
                    flex items-center justify-center 
                    bg-[linear-gradient(45deg,#FFD600,#FF7A00,#FF0069,#D300C5,#7638FA)]
                    hover:scale-110
                    transition-all duration-300
                    shadow-md
                  "
                >
                  <Instagram className="text-white w-4 h-4" />
              </a>
              <a 
                href="https://www.youtube.com/@naukaristore" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-[#FF0000] rounded-full flex items-center justify-center hover:bg-[#e20202] hover:scale-110 transition-all duration-300"
              >
                <span><LucideYoutube /></span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h3 className="text-lg font-bold text-white mb-3">Quick Links</h3>
            <div className="flex flex-wrap gap-3 justify-center text-sm">
              <Link to='/'>
              <p className="text-gray-300 hover:text-[rgb(0,142,228)] transition-colors">Home</p></Link>
              <span className="text-gray-600">|</span>
              <Link to='/jobs'>
              <p className="text-gray-300 hover:text-[rgb(0,142,228)] transition-colors">Jobs</p></Link>
              <span className="text-gray-600">|</span>
               <Link to='/AllResultList'>
              <p className="text-gray-300 hover:text-[rgb(0,142,228)] transition-colors">Results</p></Link>
              <span className="text-gray-600">|</span>
                <Link to='/AllAdmitCardList'>
              <p className="text-gray-300 hover:text-[rgb(0,142,228)] transition-colors">Admit Card</p></Link>
              <span className="text-gray-600">|</span>
               <Link to='/government-services-all'>
              <p className="text-gray-300 hover:text-[rgb(0,142,228)] transition-colors">Government Services</p>
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-right">
            <h3 className="text-lg font-bold text-white mb-3">Contact Us</h3>
            <p className="text-sm text-[rgb(0,142,228)]">📧 admin@naukaristore.com</p>
            <p className="text-sm text-white mt-1">📞 +91 96<span className="text-[rgb(0,142,228)]">705705</span>75</p>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-gray-950 py-3 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-sm">
            <p className="text-gray-400 text-center md:text-left">
              © 2025 <span className="text-[rgb(0,142,228)] font-semibold">Naukari Store</span>. All Rights Reserved.
            </p>
            <div className="flex gap-4">
              <Link to='/public/privacy-policy'>
              <p className="text-gray-400 hover:text-[rgb(0,142,228)] transition-colors">Privacy</p></Link>
              <Link to='/public/terms-and-conditions'>
              <p className="text-gray-400 hover:text-[rgb(0,142,228)] transition-colors">Terms</p></Link>
              <Link to='/public/contact'>
              <p className="text-gray-400 hover:text-[rgb(0,142,228)] transition-colors">Contact</p></Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer