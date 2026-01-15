import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, ArrowLeft, CheckCircle, XCircle, AlertTriangle, Scale, Globe, Users, Gavel, BookOpen } from 'lucide-react';

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
          <div className="bg-blue-50 border-l-4 border-primary p-4 rounded">
            <p className="text-gray-700 text-base lg:text-sm sm:text-xs">
              Welcome to <strong>NaukariStore.com</strong> (<a href="https://www.naukaristore.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">https://www.naukaristore.com</a>). Please read these Terms and Conditions carefully before using our website. By accessing or using NaukariStore.com, you agree to be bound by these Terms and Conditions.
            </p>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-6 lg:space-y-4">
          {/* About NaukariStore */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-5 sm:p-4">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-6 h-6 lg:w-5 lg:h-5 text-primary" />
              <h2 className="text-2xl lg:text-xl sm:text-lg font-bold text-gray-800">
                About NaukariStore.com
              </h2>
            </div>
            <div className="text-gray-700 text-base lg:text-sm sm:text-xs space-y-3">
              <p><strong>NaukariStore.com</strong> is an independent job information portal that provides:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Latest government job notifications and vacancies</li>
                <li>Sarkari Result updates and examination results</li>
                <li>Admit card download information and links</li>
                <li>Answer key releases and updates</li>
                <li>Syllabus and exam pattern information</li>
                <li>Important dates and application deadlines</li>
              </ul>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3 mt-4 rounded">
                <p className="font-semibold text-yellow-800">Important:</p>
                <p className="text-yellow-700 mt-1">NaukariStore.com is NOT an official government website. We are an independent platform providing job-related information for educational and informational purposes only.</p>
              </div>
            </div>
          </div>

          {/* Acceptance of Terms */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-5 sm:p-4">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-6 h-6 lg:w-5 lg:h-5 text-green-600" />
              <h2 className="text-2xl lg:text-xl sm:text-lg font-bold text-gray-800">
                Acceptance of Terms
              </h2>
            </div>
            <div className="text-gray-700 text-base lg:text-sm sm:text-xs space-y-3">
              <p>By accessing and using <strong>NaukariStore.com</strong>, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.</p>
              <p>If you do not agree to these Terms and Conditions, please do not use this website.</p>
              <p>These terms apply to all visitors, users, and others who access or use NaukariStore.com.</p>
            </div>
          </div>

          {/* Use of Website */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-5 sm:p-4">
            <div className="flex items-center gap-3 mb-4">
              <Scale className="w-6 h-6 lg:w-5 lg:h-5 text-primary" />
              <h2 className="text-2xl lg:text-xl sm:text-lg font-bold text-gray-800">
                Permitted Use of NaukariStore.com
              </h2>
            </div>
            <div className="text-gray-700 text-base lg:text-sm sm:text-xs space-y-3">
              <p>You agree to use NaukariStore.com only for lawful purposes and in a way that does not infringe the rights of others.</p>

              <div className="mt-4">
                <h3 className="font-semibold text-green-700 mb-2">You MAY:</h3>
                <ul className="list-disc list-inside ml-4 space-y-2 text-green-700">
                  <li>Browse and access job information for personal use</li>
                  <li>Share links to NaukariStore.com with friends and family</li>
                  <li>Save and bookmark pages for your reference</li>
                  <li>Use information to apply for government jobs through official channels</li>
                  <li>Subscribe to notifications and alerts</li>
                </ul>
              </div>

              <div className="mt-4">
                <h3 className="font-semibold text-red-700 mb-2">You must NOT:</h3>
                <ul className="list-disc list-inside ml-4 space-y-2 text-red-700">
                  <li>Use NaukariStore.com in any way that is unlawful or fraudulent</li>
                  <li>Transmit any harmful, malicious code, or viruses</li>
                  <li>Attempt to gain unauthorized access to any part of the website</li>
                  <li>Interfere with or disrupt the website or servers</li>
                  <li>Reproduce, duplicate, or copy content for commercial purposes without permission</li>
                  <li>Use automated systems (bots, scrapers) to access the website without permission</li>
                  <li>Collect or harvest user information from the website</li>
                  <li>Impersonate NaukariStore.com or claim official affiliation</li>
                  <li>Use our content to create competing websites</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Information Accuracy */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-5 sm:p-4">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 lg:w-5 lg:h-5 text-yellow-600" />
              <h2 className="text-2xl lg:text-xl sm:text-lg font-bold text-gray-800">
                Information Accuracy & Verification
              </h2>
            </div>
            <div className="text-gray-700 text-base lg:text-sm sm:text-xs space-y-3">
              <p>NaukariStore.com strives to provide accurate and up-to-date information about government jobs, exam notifications, results, and admit cards. However:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>We do not guarantee the accuracy, completeness, or timeliness of any information</li>
                <li>Information is gathered from various official sources and third-party websites</li>
                <li>We are not responsible for any errors, omissions, or outdated information</li>
                <li>Job notifications, dates, and eligibility criteria may change without prior notice</li>
                <li>We are NOT affiliated with any government organization or recruitment body</li>
              </ul>
              <div className="bg-red-50 border-l-4 border-red-500 p-3 mt-4 rounded">
                <p className="font-semibold text-red-800">Mandatory Verification:</p>
                <p className="text-red-700 mt-1">Users MUST verify all information from official government websites before taking any action, submitting applications, or making decisions based on information from NaukariStore.com.</p>
              </div>
            </div>
          </div>

          {/* User Accounts */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-5 sm:p-4">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 lg:w-5 lg:h-5 text-primary" />
              <h2 className="text-2xl lg:text-xl sm:text-lg font-bold text-gray-800">
                User Accounts & Registration
              </h2>
            </div>
            <div className="text-gray-700 text-base lg:text-sm sm:text-xs space-y-3">
              <p>If you create an account on NaukariStore.com, you are responsible for:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Providing accurate, current, and complete registration information</li>
                <li>Maintaining the security and confidentiality of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized use of your account</li>
                <li>Keeping your contact information updated</li>
              </ul>
              <p className="mt-3">NaukariStore.com reserves the right to:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Suspend or terminate accounts that violate these terms</li>
                <li>Remove or edit content at our sole discretion</li>
                <li>Refuse service to anyone for any reason</li>
              </ul>
            </div>
          </div>

          {/* Intellectual Property */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-5 sm:p-4">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-6 h-6 lg:w-5 lg:h-5 text-primary" />
              <h2 className="text-2xl lg:text-xl sm:text-lg font-bold text-gray-800">
                Intellectual Property Rights
              </h2>
            </div>
            <div className="text-gray-700 text-base lg:text-sm sm:text-xs space-y-3">
              <p>The NaukariStore.com name, logo, website design, and original content are the intellectual property of NaukariStore.com.</p>
              <p>You may view and print pages for personal, non-commercial use subject to these restrictions:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>You must not republish material without proper attribution to NaukariStore.com</li>
                <li>You must not sell, rent, or sub-license our material</li>
                <li>You must not reproduce content for commercial purposes</li>
                <li>You must not remove any copyright or proprietary notices</li>
              </ul>
              <div className="bg-gray-50 border-l-4 border-gray-400 p-3 mt-4 rounded">
                <p className="text-gray-700">Government job notifications and official documents referenced on NaukariStore.com remain the property of their respective government organizations. NaukariStore.com claims no ownership over official government content.</p>
              </div>
            </div>
          </div>

          {/* Third-Party Links */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-5 sm:p-4">
            <h2 className="text-2xl lg:text-xl sm:text-lg font-bold text-gray-800 mb-3">
              Third-Party Links & External Websites
            </h2>
            <div className="text-gray-700 text-base lg:text-sm sm:text-xs space-y-3">
              <p>NaukariStore.com contains links to official government websites and other external resources for your convenience.</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>We have no control over external websites and assume no responsibility for their content</li>
                <li>Links to external sites do not constitute endorsement by NaukariStore.com</li>
                <li>Users access external links at their own risk</li>
                <li>We recommend reviewing the terms and privacy policies of external websites</li>
              </ul>
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
              <p>To the maximum extent permitted by applicable law, NaukariStore.com and its owners shall NOT be liable for:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Any indirect, incidental, special, consequential, or punitive damages</li>
                <li>Loss of profits, data, or business opportunities</li>
                <li>Missed job applications or examination deadlines</li>
                <li>Errors, inaccuracies, or omissions in content</li>
                <li>Decisions made based on information from NaukariStore.com</li>
                <li>Website downtime, technical issues, or server failures</li>
                <li>Unauthorized access to user data or transmissions</li>
                <li>Any third-party actions or content</li>
              </ul>
              <div className="bg-red-50 border-l-4 border-red-500 p-3 mt-4 rounded">
                <p className="font-semibold text-red-800">Use At Your Own Risk:</p>
                <p className="text-red-700 mt-1">Your use of NaukariStore.com is entirely at your own risk. The website and all content are provided "AS IS" without warranties of any kind.</p>
              </div>
            </div>
          </div>

          {/* Indemnification */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-5 sm:p-4">
            <div className="flex items-center gap-3 mb-4">
              <Gavel className="w-6 h-6 lg:w-5 lg:h-5 text-primary" />
              <h2 className="text-2xl lg:text-xl sm:text-lg font-bold text-gray-800">
                Indemnification
              </h2>
            </div>
            <div className="text-gray-700 text-base lg:text-sm sm:text-xs space-y-3">
              <p>You agree to defend, indemnify, and hold harmless NaukariStore.com, its owners, employees, and affiliates from any claims, damages, losses, liabilities, costs, or expenses arising from:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Your use of and access to NaukariStore.com</li>
                <li>Your violation of these Terms and Conditions</li>
                <li>Your violation of any third-party rights</li>
                <li>Any content you submit or post on the website</li>
                <li>Your negligent or wrongful conduct</li>
              </ul>
            </div>
          </div>

          {/* Governing Law */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-5 sm:p-4">
            <h2 className="text-2xl lg:text-xl sm:text-lg font-bold text-gray-800 mb-3">
              Governing Law & Jurisdiction
            </h2>
            <div className="text-gray-700 text-base lg:text-sm sm:text-xs space-y-3">
              <p>These Terms and Conditions shall be governed by and construed in accordance with the laws of India.</p>
              <p>Any disputes arising from the use of NaukariStore.com shall be subject to the exclusive jurisdiction of the courts located in India.</p>
              <p>If any provision of these terms is found to be unenforceable, the remaining provisions shall continue in full force and effect.</p>
            </div>
          </div>

          {/* Changes to Terms */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-5 sm:p-4">
            <h2 className="text-2xl lg:text-xl sm:text-lg font-bold text-gray-800 mb-3">
              Changes to Terms & Conditions
            </h2>
            <div className="text-gray-700 text-base lg:text-sm sm:text-xs space-y-3">
              <p>NaukariStore.com reserves the right to modify these Terms and Conditions at any time without prior notice.</p>
              <p>Changes will be effective immediately upon posting on this page with an updated "Last Updated" date.</p>
              <p>Your continued use of NaukariStore.com after changes constitutes acceptance of the modified terms.</p>
              <p>We encourage you to review these Terms and Conditions periodically.</p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 lg:p-5 sm:p-4">
            <h2 className="text-xl lg:text-lg sm:text-base font-bold text-gray-800 mb-3">
              Questions About Terms & Conditions?
            </h2>
            <p className="text-gray-700 text-base lg:text-sm sm:text-xs mb-2">
              If you have any questions about these Terms and Conditions, please contact us:
            </p>
            <div className="text-gray-700 text-base lg:text-sm sm:text-xs mb-4">
              <p><strong>Website:</strong> <a href="https://www.naukaristore.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">https://www.naukaristore.com</a></p>
              <p><strong>Email:</strong> <a href="mailto:info@naukaristore.com" className="text-primary hover:underline">info@naukaristore.com</a></p>
            </div>
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
