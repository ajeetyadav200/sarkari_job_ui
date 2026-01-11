import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, ArrowLeft, Lock, Eye, UserCheck, Database, AlertCircle } from 'lucide-react';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      <div className="container mx-auto px-4 py-8 lg:py-6 sm:py-4 max-w-5xl">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 lg:p-5 sm:p-4 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-primary/10 p-3 rounded-lg">
              <Shield className="w-8 h-8 lg:w-6 lg:h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-2xl sm:text-xl font-bold text-gray-800">
                Privacy Policy
              </h1>
              <p className="text-sm text-gray-500 mt-1">Last Updated: January 2026</p>
            </div>
          </div>
          <p className="text-gray-600 text-base lg:text-sm sm:text-xs">
            Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-6 lg:space-y-4">
          {/* Information We Collect */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-5 sm:p-4">
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-6 h-6 lg:w-5 lg:h-5 text-primary" />
              <h2 className="text-2xl lg:text-xl sm:text-lg font-bold text-gray-800">
                Information We Collect
              </h2>
            </div>
            <div className="space-y-4 text-gray-700 text-base lg:text-sm sm:text-xs">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Personal Information</h3>
                <p>We may collect personal information that you voluntarily provide to us when you:</p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>Register on our website</li>
                  <li>Subscribe to our newsletter</li>
                  <li>Fill out a contact form</li>
                  <li>Participate in surveys or feedback</li>
                </ul>
                <p className="mt-2">This information may include: name, email address, phone number, and other contact details.</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Automatically Collected Information</h3>
                <p>When you visit our website, we may automatically collect certain information about your device, including:</p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>IP address</li>
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>Pages visited and time spent</li>
                  <li>Referring website addresses</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Cookies and Tracking Technologies</h3>
                <p>We use cookies and similar tracking technologies to track activity on our website and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</p>
              </div>
            </div>
          </div>

          {/* How We Use Your Information */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-5 sm:p-4">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-6 h-6 lg:w-5 lg:h-5 text-primary" />
              <h2 className="text-2xl lg:text-xl sm:text-lg font-bold text-gray-800">
                How We Use Your Information
              </h2>
            </div>
            <div className="text-gray-700 text-base lg:text-sm sm:text-xs space-y-3">
              <p>We may use the information we collect from you in the following ways:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>To provide, operate, and maintain our website</li>
                <li>To improve, personalize, and expand our website</li>
                <li>To understand and analyze how you use our website</li>
                <li>To develop new products, services, features, and functionality</li>
                <li>To communicate with you for customer service, updates, and promotional purposes</li>
                <li>To send you emails and notifications about job alerts, exam notifications, and results</li>
                <li>To prevent fraud and enhance security</li>
                <li>To comply with legal obligations</li>
              </ul>
            </div>
          </div>

          {/* Sharing Your Information */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-5 sm:p-4">
            <div className="flex items-center gap-3 mb-4">
              <UserCheck className="w-6 h-6 lg:w-5 lg:h-5 text-primary" />
              <h2 className="text-2xl lg:text-xl sm:text-lg font-bold text-gray-800">
                Sharing Your Information
              </h2>
            </div>
            <div className="text-gray-700 text-base lg:text-sm sm:text-xs space-y-3">
              <p>We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li><strong>Service Providers:</strong> We may share your information with third-party service providers who assist us in operating our website and conducting our business.</li>
                <li><strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities.</li>
                <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred.</li>
                <li><strong>With Your Consent:</strong> We may share your information with your explicit consent.</li>
              </ul>
            </div>
          </div>

          {/* Data Security */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-5 sm:p-4">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-6 h-6 lg:w-5 lg:h-5 text-primary" />
              <h2 className="text-2xl lg:text-xl sm:text-lg font-bold text-gray-800">
                Data Security
              </h2>
            </div>
            <div className="text-gray-700 text-base lg:text-sm sm:text-xs space-y-3">
              <p>We use administrative, technical, and physical security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure.</p>
              <p>While we strive to use commercially acceptable means to protect your information, we cannot guarantee its absolute security.</p>
            </div>
          </div>

          {/* Your Data Rights */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-5 sm:p-4">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6 lg:w-5 lg:h-5 text-primary" />
              <h2 className="text-2xl lg:text-xl sm:text-lg font-bold text-gray-800">
                Your Data Rights
              </h2>
            </div>
            <div className="text-gray-700 text-base lg:text-sm sm:text-xs space-y-3">
              <p>You have the following rights regarding your personal information:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li><strong>Access:</strong> You can request a copy of the personal information we hold about you.</li>
                <li><strong>Correction:</strong> You can request that we correct any inaccurate or incomplete information.</li>
                <li><strong>Deletion:</strong> You can request that we delete your personal information, subject to certain exceptions.</li>
                <li><strong>Opt-Out:</strong> You can opt-out of receiving marketing communications from us at any time.</li>
                <li><strong>Data Portability:</strong> You can request a copy of your data in a structured, machine-readable format.</li>
              </ul>
              <p className="mt-3">To exercise these rights, please contact us using the information provided on our Contact page.</p>
            </div>
          </div>

          {/* Third-Party Links */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-5 sm:p-4">
            <h2 className="text-2xl lg:text-xl sm:text-lg font-bold text-gray-800 mb-3">
              Third-Party Links
            </h2>
            <div className="text-gray-700 text-base lg:text-sm sm:text-xs space-y-3">
              <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these third-party sites. We encourage you to read the privacy policies of any third-party sites you visit.</p>
            </div>
          </div>

          {/* Children's Privacy */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-5 sm:p-4">
            <h2 className="text-2xl lg:text-xl sm:text-lg font-bold text-gray-800 mb-3">
              Children's Privacy
            </h2>
            <div className="text-gray-700 text-base lg:text-sm sm:text-xs space-y-3">
              <p>Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us.</p>
            </div>
          </div>

          {/* Changes to Privacy Policy */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-5 sm:p-4">
            <h2 className="text-2xl lg:text-xl sm:text-lg font-bold text-gray-800 mb-3">
              Changes to This Privacy Policy
            </h2>
            <div className="text-gray-700 text-base lg:text-sm sm:text-xs space-y-3">
              <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.</p>
              <p>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 lg:p-5 sm:p-4">
            <h2 className="text-xl lg:text-lg sm:text-base font-bold text-gray-800 mb-3">
              Questions About Our Privacy Policy?
            </h2>
            <p className="text-gray-700 text-base lg:text-sm sm:text-xs mb-3">
              If you have any questions or concerns about this Privacy Policy, please contact us through our Contact page.
            </p>
            <button
              onClick={() => navigate('/contact')}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-semibold text-sm"
            >
              Contact Us
            </button>
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

export default PrivacyPolicy;
