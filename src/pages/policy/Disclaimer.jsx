import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, ArrowLeft, Info, ExternalLink, Shield, AlertCircle } from 'lucide-react';

const Disclaimer = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      <div className="container mx-auto px-4 py-8 lg:py-6 sm:py-4 max-w-5xl">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 lg:p-5 sm:p-4 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <AlertTriangle className="w-8 h-8 lg:w-6 lg:h-6 text-yellow-600" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-2xl sm:text-xl font-bold text-gray-800">
                Disclaimer
              </h1>
              <p className="text-sm text-gray-500 mt-1">Last Updated: January 2026</p>
            </div>
          </div>
          <p className="text-gray-600 text-base lg:text-sm sm:text-xs">
            Please read this disclaimer carefully before using our website. This disclaimer governs your use of our website and the information provided on it.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-6 lg:space-y-4">
          {/* General Disclaimer */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-5 sm:p-4">
            <div className="flex items-center gap-3 mb-4">
              <Info className="w-6 h-6 lg:w-5 lg:h-5 text-primary" />
              <h2 className="text-2xl lg:text-xl sm:text-lg font-bold text-gray-800">
                General Disclaimer
              </h2>
            </div>
            <div className="text-gray-700 text-base lg:text-sm sm:text-xs space-y-3">
              <p>The information contained on this website is for general information purposes only. While we endeavor to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>The completeness, accuracy, reliability, suitability, or availability of the website or the information, products, services, or related graphics contained on the website</li>
                <li>The timeliness of job notifications, exam dates, results, or admit card information</li>
                <li>The authenticity of information gathered from various sources</li>
              </ul>
              <p className="mt-3 font-semibold text-red-600">
                Any reliance you place on such information is therefore strictly at your own risk.
              </p>
            </div>
          </div>

          {/* No Official Affiliation */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-5 sm:p-4">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 lg:w-5 lg:h-5 text-red-600" />
              <h2 className="text-2xl lg:text-xl sm:text-lg font-bold text-gray-800">
                No Official Affiliation
              </h2>
            </div>
            <div className="text-gray-700 text-base lg:text-sm sm:text-xs space-y-3">
              <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded">
                <p className="font-semibold text-red-800">IMPORTANT NOTICE:</p>
                <p className="mt-2">This website is NOT an official government website. We are NOT affiliated with, endorsed by, or connected to any government organization, recruitment board, or examination authority.</p>
              </div>
              <ul className="list-disc list-inside ml-4 space-y-2 mt-4">
                <li>We are an independent job information portal</li>
                <li>We aggregate information from various official government sources and make it available in one place for user convenience</li>
                <li>We do NOT conduct any recruitment, examination, or selection process</li>
                <li>We do NOT accept job applications</li>
                <li>We do NOT issue admit cards, results, or certificates</li>
                <li>All recruitment processes are conducted by respective government organizations</li>
              </ul>
            </div>
          </div>

          {/* Information Accuracy */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-5 sm:p-4">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6 lg:w-5 lg:h-5 text-yellow-600" />
              <h2 className="text-2xl lg:text-xl sm:text-lg font-bold text-gray-800">
                Information Accuracy and Verification
              </h2>
            </div>
            <div className="text-gray-700 text-base lg:text-sm sm:text-xs space-y-3">
              <p>While we strive to provide accurate and timely information:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Information on this website is collected from various official government websites and third-party sources</li>
                <li>We cannot guarantee 100% accuracy of all information published</li>
                <li>Dates, eligibility criteria, fees, and other details may change without notice</li>
                <li>There may be delays in updating information on our website</li>
                <li>Typographical errors or inaccuracies may occur</li>
              </ul>

              <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 rounded mt-4">
                <p className="font-semibold text-yellow-800">Recommendation:</p>
                <p className="mt-2">Users are strongly advised to verify all information from the official website of the respective organization before taking any action, applying for jobs, or making any decisions.</p>
              </div>
            </div>
          </div>

          {/* External Links */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-5 sm:p-4">
            <div className="flex items-center gap-3 mb-4">
              <ExternalLink className="w-6 h-6 lg:w-5 lg:h-5 text-primary" />
              <h2 className="text-2xl lg:text-xl sm:text-lg font-bold text-gray-800">
                External Links and Third-Party Content
              </h2>
            </div>
            <div className="text-gray-700 text-base lg:text-sm sm:text-xs space-y-3">
              <p>This website may contain links to external websites and third-party content that are not provided or maintained by us.</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>We do not guarantee the accuracy, relevance, timeliness, or completeness of any information on external websites</li>
                <li>We are not responsible for the content, privacy policies, or practices of external websites</li>
                <li>The inclusion of any links does not imply endorsement by us</li>
                <li>Users access external links at their own risk</li>
                <li>We shall not be liable for any loss or damage arising from the use of external websites</li>
              </ul>
            </div>
          </div>

          {/* Limitation of Liability */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-5 sm:p-4">
            <h2 className="text-2xl lg:text-xl sm:text-lg font-bold text-gray-800 mb-3">
              Limitation of Liability
            </h2>
            <div className="text-gray-700 text-base lg:text-sm sm:text-xs space-y-3">
              <p>In no event shall we be liable for any loss or damage including without limitation:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Indirect or consequential loss or damage</li>
                <li>Loss of data or information</li>
                <li>Loss of profit or opportunity</li>
                <li>Missed job applications or exam dates</li>
                <li>Any loss or damage whatsoever arising from the use of this website</li>
                <li>Any loss or damage arising from reliance on information published on this website</li>
                <li>Technical issues, downtime, or unavailability of the website</li>
                <li>Errors or omissions in the content</li>
              </ul>
            </div>
          </div>

          {/* No Guarantee of Employment */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-5 sm:p-4">
            <h2 className="text-2xl lg:text-xl sm:text-lg font-bold text-gray-800 mb-3">
              No Guarantee of Employment or Selection
            </h2>
            <div className="text-gray-700 text-base lg:text-sm sm:text-xs space-y-3">
              <div className="bg-orange-50 border-l-4 border-orange-600 p-4 rounded">
                <p className="font-semibold text-orange-800">Important Notice:</p>
                <ul className="list-disc list-inside ml-4 space-y-2 mt-2">
                  <li>We do NOT guarantee employment or selection in any job</li>
                  <li>We do NOT charge any fees for job information</li>
                  <li>We do NOT offer any paid courses, coaching, or exam preparation services</li>
                  <li>Beware of fraudulent websites or persons claiming to provide guaranteed jobs</li>
                  <li>Never pay money to anyone claiming to offer jobs through our website</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Professional Advice Disclaimer */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-5 sm:p-4">
            <h2 className="text-2xl lg:text-xl sm:text-lg font-bold text-gray-800 mb-3">
              Professional Advice Disclaimer
            </h2>
            <div className="text-gray-700 text-base lg:text-sm sm:text-xs space-y-3">
              <p>The information on this website is provided for general informational and educational purposes only and is not intended as professional advice.</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>We do NOT provide career counseling, legal advice, or professional guidance</li>
                <li>Users should consult with qualified professionals for specific advice tailored to their situation</li>
                <li>We are not responsible for decisions made based on information from this website</li>
              </ul>
            </div>
          </div>

          {/* Copyright and Intellectual Property */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-5 sm:p-4">
            <h2 className="text-2xl lg:text-xl sm:text-lg font-bold text-gray-800 mb-3">
              Copyright and Intellectual Property
            </h2>
            <div className="text-gray-700 text-base lg:text-sm sm:text-xs space-y-3">
              <p>All job notifications, exam details, and official documents are the property of their respective government organizations and recruitment boards.</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>We claim no ownership over official government notifications or documents</li>
                <li>All trademarks, logos, and service marks displayed are the property of their respective owners</li>
                <li>We use official notifications and information under fair use for informational purposes only</li>
              </ul>
            </div>
          </div>

          {/* Changes to Disclaimer */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-5 sm:p-4">
            <h2 className="text-2xl lg:text-xl sm:text-lg font-bold text-gray-800 mb-3">
              Changes to This Disclaimer
            </h2>
            <div className="text-gray-700 text-base lg:text-sm sm:text-xs space-y-3">
              <p>We may update our Disclaimer from time to time. We will notify you of any changes by posting the new Disclaimer on this page and updating the "Last Updated" date.</p>
              <p>You are advised to review this Disclaimer periodically for any changes.</p>
            </div>
          </div>

          {/* User Responsibility */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-5 sm:p-4">
            <h2 className="text-2xl lg:text-xl sm:text-lg font-bold text-gray-800 mb-3">
              User Responsibility
            </h2>
            <div className="text-gray-700 text-base lg:text-sm sm:text-xs space-y-3">
              <p>By using this website, you acknowledge and agree that:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>You are solely responsible for verifying all information before use</li>
                <li>You will check official websites for accurate and updated information</li>
                <li>You understand that we are not liable for any consequences arising from the use of this website</li>
                <li>You will not hold us responsible for missed opportunities, incorrect information, or any other issues</li>
                <li>You accept all risks associated with using the information provided</li>
              </ul>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 lg:p-5 sm:p-4">
            <h2 className="text-xl lg:text-lg sm:text-base font-bold text-gray-800 mb-3">
              Questions or Concerns?
            </h2>
            <p className="text-gray-700 text-base lg:text-sm sm:text-xs mb-3">
              If you have any questions or concerns about this Disclaimer, please feel free to contact us.
            </p>
            <button
              onClick={() => navigate('/contact')}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-semibold text-sm"
            >
              Contact Us
            </button>
          </div>

          {/* Final Notice */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-300 rounded-xl p-6 lg:p-5 sm:p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-red-800 mb-2">Final Important Notice</h3>
                <p className="text-gray-800 text-sm font-semibold">
                  By using this website, you acknowledge that you have read, understood, and agree to be bound by this Disclaimer. If you do not agree with this Disclaimer, please do not use this website.
                </p>
                <p className="text-gray-700 text-sm mt-2">
                  Always verify information from official government sources. We are NOT responsible for any decisions you make based on the information provided on this website.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/')}
            className="px-8 py-3 lg:px-6 lg:py-2 sm:px-4 sm:py-2 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-base lg:text-sm sm:text-xs"
          >
            <ArrowLeft className="w-5 h-5 lg:w-4 lg:h-4 sm:w-3 sm:h-3" />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
