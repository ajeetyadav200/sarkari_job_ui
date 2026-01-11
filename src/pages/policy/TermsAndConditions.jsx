import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, ArrowLeft, CheckCircle, XCircle, AlertTriangle, Scale } from 'lucide-react';

const TermsAndConditions = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      <div className="container mx-auto px-4 py-8 lg:py-6 sm:py-4 max-w-5xl">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 lg:p-5 sm:p-4 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-primary/10 p-3 rounded-lg">
              <FileText className="w-8 h-8 lg:w-6 lg:h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-2xl sm:text-xl font-bold text-gray-800">
                Terms & Conditions
              </h1>
              <p className="text-sm text-gray-500 mt-1">Last Updated: January 2026</p>
            </div>
          </div>
          <p className="text-gray-600 text-base lg:text-sm sm:text-xs">
            Please read these Terms and Conditions carefully before using our website. By accessing or using our website, you agree to be bound by these Terms and Conditions.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-6 lg:space-y-4">
          {/* Acceptance of Terms */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-5 sm:p-4">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-6 h-6 lg:w-5 lg:h-5 text-green-600" />
              <h2 className="text-2xl lg:text-xl sm:text-lg font-bold text-gray-800">
                Acceptance of Terms
              </h2>
            </div>
            <div className="text-gray-700 text-base lg:text-sm sm:text-xs space-y-3">
              <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>
              <p>If you do not agree to these Terms and Conditions, please do not use this website.</p>
            </div>
          </div>

          {/* Use of Website */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-5 sm:p-4">
            <div className="flex items-center gap-3 mb-4">
              <Scale className="w-6 h-6 lg:w-5 lg:h-5 text-primary" />
              <h2 className="text-2xl lg:text-xl sm:text-lg font-bold text-gray-800">
                Use of Website
              </h2>
            </div>
            <div className="text-gray-700 text-base lg:text-sm sm:text-xs space-y-3">
              <p>You agree to use this website only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the website.</p>

              <div className="mt-4">
                <h3 className="font-semibold text-gray-800 mb-2">You agree NOT to:</h3>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Use the website in any way that is unlawful or fraudulent</li>
                  <li>Transmit any harmful or malicious code</li>
                  <li>Attempt to gain unauthorized access to any part of the website</li>
                  <li>Interfere with or disrupt the website or servers</li>
                  <li>Reproduce, duplicate, copy, or resell any part of the website</li>
                  <li>Use automated systems to access the website without permission</li>
                  <li>Collect or harvest any information from the website</li>
                  <li>Impersonate any person or entity</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Information Accuracy */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-5 sm:p-4">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 lg:w-5 lg:h-5 text-yellow-600" />
              <h2 className="text-2xl lg:text-xl sm:text-lg font-bold text-gray-800">
                Information Accuracy
              </h2>
            </div>
            <div className="text-gray-700 text-base lg:text-sm sm:text-xs space-y-3">
              <p>We strive to provide accurate and up-to-date information about government jobs, exam notifications, results, and admit cards. However:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>We do not guarantee the accuracy, completeness, or timeliness of any information on the website</li>
                <li>Information is gathered from various official sources and third-party websites</li>
                <li>We are not responsible for any errors or omissions in the content</li>
                <li>Users should always verify information from official government sources before taking any action</li>
                <li>We are not affiliated with any government organization or recruitment body</li>
              </ul>
            </div>
          </div>

          {/* Intellectual Property */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-5 sm:p-4">
            <h2 className="text-2xl lg:text-xl sm:text-lg font-bold text-gray-800 mb-3">
              Intellectual Property Rights
            </h2>
            <div className="text-gray-700 text-base lg:text-sm sm:text-xs space-y-3">
              <p>Unless otherwise stated, we own the intellectual property rights for all material on this website. All intellectual property rights are reserved.</p>
              <p>You may view and/or print pages from the website for your own personal use subject to restrictions set in these terms and conditions.</p>

              <div className="mt-4">
                <h3 className="font-semibold text-gray-800 mb-2">You must not:</h3>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Republish material from this website without proper attribution</li>
                  <li>Sell, rent, or sub-license material from the website</li>
                  <li>Reproduce, duplicate, or copy material for commercial purposes</li>
                  <li>Redistribute content from this website (unless content is specifically made for redistribution)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Third-Party Links */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-5 sm:p-4">
            <h2 className="text-2xl lg:text-xl sm:text-lg font-bold text-gray-800 mb-3">
              Third-Party Links and Content
            </h2>
            <div className="text-gray-700 text-base lg:text-sm sm:text-xs space-y-3">
              <p>Our website may contain links to third-party websites or services that are not owned or controlled by us.</p>
              <p>We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.</p>
              <p>You acknowledge and agree that we shall not be responsible or liable, directly or indirectly, for any damage or loss caused by or in connection with the use of any such content, goods, or services available on or through any such websites or services.</p>
            </div>
          </div>

          {/* User Accounts */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-5 sm:p-4">
            <h2 className="text-2xl lg:text-xl sm:text-lg font-bold text-gray-800 mb-3">
              User Accounts
            </h2>
            <div className="text-gray-700 text-base lg:text-sm sm:text-xs space-y-3">
              <p>If you create an account on our website, you are responsible for:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Maintaining the confidentiality of your account and password</li>
                <li>Restricting access to your computer or device</li>
                <li>All activities that occur under your account</li>
                <li>Providing accurate and complete information</li>
                <li>Updating your information to keep it accurate and current</li>
              </ul>
              <p className="mt-3">We reserve the right to terminate accounts, remove or edit content at our sole discretion.</p>
            </div>
          </div>

          {/* Limitation of Liability */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-5 sm:p-4">
            <div className="flex items-center gap-3 mb-4">
              <XCircle className="w-6 h-6 lg:w-5 lg:h-5 text-red-600" />
              <h2 className="text-2xl lg:text-xl sm:text-lg font-bold text-gray-800">
                Limitation of Liability
              </h2>
            </div>
            <div className="text-gray-700 text-base lg:text-sm sm:text-xs space-y-3">
              <p>To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Your access to or use of (or inability to access or use) the website</li>
                <li>Any conduct or content of any third party on the website</li>
                <li>Any content obtained from the website</li>
                <li>Unauthorized access, use, or alteration of your transmissions or content</li>
                <li>Errors, mistakes, or inaccuracies in content</li>
                <li>Loss of data or information</li>
                <li>Missed job opportunities or exam dates due to reliance on our information</li>
              </ul>
            </div>
          </div>

          {/* Indemnification */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-5 sm:p-4">
            <h2 className="text-2xl lg:text-xl sm:text-lg font-bold text-gray-800 mb-3">
              Indemnification
            </h2>
            <div className="text-gray-700 text-base lg:text-sm sm:text-xs space-y-3">
              <p>You agree to defend, indemnify, and hold harmless the website, its owners, employees, and affiliates from and against any and all claims, damages, obligations, losses, liabilities, costs, or debt, and expenses arising from:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Your use of and access to the website</li>
                <li>Your violation of any term of these Terms and Conditions</li>
                <li>Your violation of any third-party right, including any intellectual property or privacy right</li>
                <li>Any claim that your content caused damage to a third party</li>
              </ul>
            </div>
          </div>

          {/* Governing Law */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-5 sm:p-4">
            <h2 className="text-2xl lg:text-xl sm:text-lg font-bold text-gray-800 mb-3">
              Governing Law
            </h2>
            <div className="text-gray-700 text-base lg:text-sm sm:text-xs space-y-3">
              <p>These Terms and Conditions shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.</p>
              <p>Any disputes arising out of or relating to these Terms and Conditions shall be subject to the exclusive jurisdiction of the courts located in India.</p>
            </div>
          </div>

          {/* Changes to Terms */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-5 sm:p-4">
            <h2 className="text-2xl lg:text-xl sm:text-lg font-bold text-gray-800 mb-3">
              Changes to Terms and Conditions
            </h2>
            <div className="text-gray-700 text-base lg:text-sm sm:text-xs space-y-3">
              <p>We reserve the right to modify or replace these Terms and Conditions at any time at our sole discretion.</p>
              <p>If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect.</p>
              <p>By continuing to access or use our website after any revisions become effective, you agree to be bound by the revised terms.</p>
            </div>
          </div>

          {/* Severability */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-5 sm:p-4">
            <h2 className="text-2xl lg:text-xl sm:text-lg font-bold text-gray-800 mb-3">
              Severability
            </h2>
            <div className="text-gray-700 text-base lg:text-sm sm:text-xs space-y-3">
              <p>If any provision of these Terms and Conditions is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that these Terms and Conditions will otherwise remain in full force and effect.</p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 lg:p-5 sm:p-4">
            <h2 className="text-xl lg:text-lg sm:text-base font-bold text-gray-800 mb-3">
              Questions About Terms & Conditions?
            </h2>
            <p className="text-gray-700 text-base lg:text-sm sm:text-xs mb-3">
              If you have any questions about these Terms and Conditions, please contact us through our Contact page.
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

export default TermsAndConditions;
