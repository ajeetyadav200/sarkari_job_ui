const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white mt-12">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid md:grid-cols-3 gap-6 items-center">
          {/* About Section */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-green-400">
              Naukari Store
            </h3>
            <p className="text-lg text-gray-300 mt-1">नौकरी स्टोर</p>
            <div className="mt-3 flex gap-3 justify-center md:justify-start">
              <a href="#" className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                <span>f</span>
              </a>
              <a href="#" className="w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors">
                <span>𝕏</span>
              </a>
              <a href="#" className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
                <span>▶</span>
              </a>
              <a href="#" className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors">
                <span>📷</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h3 className="text-lg font-bold text-green-400 mb-3">Quick Links</h3>
            <div className="flex flex-wrap gap-3 justify-center text-sm">
              <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Home</a>
              <span className="text-gray-600">|</span>
              <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Jobs</a>
              <span className="text-gray-600">|</span>
              <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Results</a>
              <span className="text-gray-600">|</span>
              <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Admit Card</a>
              <span className="text-gray-600">|</span>
              <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Syllabus</a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-right">
            <h3 className="text-lg font-bold text-green-400 mb-3">Contact Us</h3>
            <p className="text-sm text-gray-300">📧 info@naukaristore.com</p>
            <p className="text-sm text-gray-300 mt-1">📞 +91 98765 43210</p>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-gray-950 py-3 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-sm">
            <p className="text-gray-400 text-center md:text-left">
              © 2025 <span className="text-green-400 font-semibold">Naukari Store</span>. All Rights Reserved.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Terms</a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer