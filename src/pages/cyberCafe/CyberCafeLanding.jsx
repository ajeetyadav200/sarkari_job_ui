import { Link } from "react-router-dom";
import {
  Monitor,
  Image,
  FileText,
  ArrowRight,
  Check,
  Zap,
  Shield,
  Clock,
} from "lucide-react";

const CyberCafeLanding = () => {
  const features = [
    {
      icon: Image,
      title: "Image Compression",
      description: "Compress images to exact sizes required by government portals",
    },
    {
      icon: Zap,
      title: "Fast Processing",
      description: "All processing done locally - no upload needed",
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your images never leave your device",
    },
    {
      icon: Clock,
      title: "Time Saver",
      description: "Process multiple images in seconds",
    },
  ];

  const benefits = [
    "Compress images to exact KB size (10KB, 20KB, 50KB, etc.)",
    "Crop and resize for passport photos & signatures",
    "Rotate images to correct orientation",
    "Download processed images instantly",
    "Works offline - no internet required for processing",
    "Free to use for all cyber cafe owners",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-6">
              <Monitor className="w-10 h-10 text-purple-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Cyber Cafe Tools
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Professional image processing tools for cyber cafe owners. Compress,
              crop, and resize images for government form submissions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/cyber-cafe/login"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-purple-700 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
              >
                Login to Dashboard
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/cyber-cafe/signup"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-colors border border-purple-500"
              >
                Register Your Cafe
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Why Choose Our Tools?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-purple-100 rounded-full mb-4">
                  <feature.icon className="w-7 h-7 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Everything You Need for Government Form Photos
              </h2>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Common Size Requirements
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-orange-50 rounded-lg">
                  <h4 className="font-medium text-orange-700">Passport Photo</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Size: 10-200 KB | Dimensions: 3.5 x 4.5 cm
                  </p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-700">Signature</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Size: 4-30 KB | Dimensions: 140 x 60 pixels
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-700">ID Proof</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Size: 50-300 KB | Format: JPG/PDF
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-purple-200 mb-8">
            Register your cyber cafe today and start using our professional image tools
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/image-tool"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-purple-700 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
            >
              <Image className="w-5 h-5" />
              Try Image Tool Free
            </Link>
            <Link
              to="/cyber-cafe/signup"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-purple-800 text-white font-semibold rounded-xl hover:bg-purple-900 transition-colors"
            >
              Register Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Back to Home */}
      <div className="bg-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Link
            to="/"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Back to Naukari Store Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CyberCafeLanding;
