import { useNavigate } from 'react-router-dom';
import { Shield, ArrowLeft, Lock, Eye, UserCheck, Database, AlertCircle, Cookie, Bell, Smartphone, Globe, Mail, Settings, Trash2 } from 'lucide-react';

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
          <div className="bg-blue-50 border-l-4 border-primary p-4 rounded">
            <p className="text-gray-700 text-base lg:text-sm sm:text-xs">
              Your privacy is important to us at <strong>NaukariStore.com</strong> (<a href="https://www.naukaristore.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">https://www.naukaristore.com</a>). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
            </p>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-6 lg:space-y-4">
          {/* Privacy Commitment */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl shadow-lg p-6 lg:p-5 sm:p-4 text-white">
            <div className="flex items-start gap-3">
              <Lock className="w-8 h-8 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl lg:text-xl sm:text-lg font-bold mb-3">
                  Our Privacy Commitment
                </h2>
                <p className="text-white/95 text-base lg:text-sm sm:text-xs mb-3">
                  At <strong>NaukariStore.com</strong>, we are committed to protecting your privacy and personal information. We:
                </p>
                <ul className="list-disc list-inside space-y-2 text-white/90">
                  <li>Collect only necessary information</li>
                  <li>Never sell your personal data to third parties</li>
                  <li>Use industry-standard security measures</li>
                  <li>Give you control over your data</li>
                  <li>Are transparent about our data practices</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Information We Collect */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-5 sm:p-4">
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-6 h-6 lg:w-5 lg:h-5 text-primary" />
              <h2 className="text-2xl lg:text-xl sm:text-lg font-bold text-gray-800">
                Information We Collect
              </h2>
            </div>
            <div className="space-y-5 text-gray-700 text-base lg:text-sm sm:text-xs">
              {/* Personal Information */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <UserCheck className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-800">Personal Information (Voluntarily Provided)</h3>
                </div>
                <p className="mb-2">When you register or interact with NaukariStore.com, you may provide:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li><strong>Name:</strong> Your full name for account identification</li>
                  <li><strong>Email Address:</strong> For account verification and notifications</li>
                  <li><strong>Phone Number:</strong> For OTP verification and SMS alerts</li>
                  <li><strong>Location/State:</strong> To show relevant job notifications</li>
                  <li><strong>Educational Qualifications:</strong> For personalized job recommendations</li>
                  <li><strong>Job Preferences:</strong> Categories and types of jobs you're interested in</li>
                </ul>
              </div>

              {/* Automatically Collected */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Globe className="w-5 h-5 text-gray-600" />
                  <h3 className="font-semibold text-gray-800">Automatically Collected Information</h3>
                </div>
                <p className="mb-2">When you visit NaukariStore.com, we automatically collect:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li><strong>IP Address:</strong> For security and analytics</li>
                  <li><strong>Browser Type & Version:</strong> To optimize website display</li>
                  <li><strong>Operating System:</strong> For compatibility purposes</li>
                  <li><strong>Device Information:</strong> Mobile/Desktop, screen resolution</li>
                  <li><strong>Pages Visited:</strong> To understand user interests</li>
                  <li><strong>Time Spent:</strong> For content improvement</li>
                  <li><strong>Referring URL:</strong> How you found our website</li>
                  <li><strong>Click Patterns:</strong> To improve user experience</li>
                </ul>
              </div>

              {/* Cookies */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Cookie className="w-5 h-5 text-yellow-600" />
                  <h3 className="font-semibold text-gray-800">Cookies & Tracking Technologies</h3>
                </div>
                <p className="mb-2">NaukariStore.com uses cookies for:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li><strong>Essential Cookies:</strong> Required for website functionality</li>
                  <li><strong>Preference Cookies:</strong> Remember your settings and choices</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand how visitors use the site</li>
                  <li><strong>Session Cookies:</strong> Keep you logged in during your visit</li>
                </ul>
                <p className="mt-3 text-yellow-700">You can control cookies through your browser settings. Disabling cookies may affect some website features.</p>
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
              <p>NaukariStore.com uses collected information for the following purposes:</p>

              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-800 mb-2">Service Delivery</h3>
                  <ul className="list-disc list-inside space-y-1 text-green-700 text-sm">
                    <li>Provide job notifications and alerts</li>
                    <li>Send exam result updates</li>
                    <li>Deliver admit card information</li>
                    <li>Personalize content based on preferences</li>
                  </ul>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-800 mb-2">Communication</h3>
                  <ul className="list-disc list-inside space-y-1 text-blue-700 text-sm">
                    <li>Send email notifications</li>
                    <li>SMS alerts for new jobs</li>
                    <li>Important deadline reminders</li>
                    <li>Customer support responses</li>
                  </ul>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h3 className="font-semibold text-purple-800 mb-2">Improvement</h3>
                  <ul className="list-disc list-inside space-y-1 text-purple-700 text-sm">
                    <li>Analyze website usage patterns</li>
                    <li>Develop new features</li>
                    <li>Improve user experience</li>
                    <li>Fix bugs and issues</li>
                  </ul>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h3 className="font-semibold text-orange-800 mb-2">Security</h3>
                  <ul className="list-disc list-inside space-y-1 text-orange-700 text-sm">
                    <li>Prevent fraud and abuse</li>
                    <li>Protect user accounts</li>
                    <li>Monitor for suspicious activity</li>
                    <li>Comply with legal requirements</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Information Sharing */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-5 sm:p-4">
            <div className="flex items-center gap-3 mb-4">
              <UserCheck className="w-6 h-6 lg:w-5 lg:h-5 text-primary" />
              <h2 className="text-2xl lg:text-xl sm:text-lg font-bold text-gray-800">
                Information Sharing & Disclosure
              </h2>
            </div>
            <div className="text-gray-700 text-base lg:text-sm sm:text-xs space-y-3">
              <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded mb-4">
                <p className="font-bold text-green-800">NaukariStore.com does NOT sell, trade, or rent your personal information to third parties.</p>
              </div>

              <p>We may share your information only in the following limited circumstances:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li><strong>Service Providers:</strong> Trusted third-party services that help us operate the website (hosting, email services, SMS gateway, analytics). These providers are bound by confidentiality agreements.</li>
                <li><strong>Legal Requirements:</strong> When required by law, court order, or government authority.</li>
                <li><strong>Safety & Protection:</strong> To protect the rights, property, or safety of NaukariStore.com, our users, or others.</li>
                <li><strong>Business Transfers:</strong> In case of merger, acquisition, or sale of assets (users will be notified).</li>
                <li><strong>With Your Consent:</strong> When you explicitly agree to share information.</li>
              </ul>

              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mt-4">
                <p className="font-semibold text-red-800">We Never Share:</p>
                <ul className="list-disc list-inside text-red-700 mt-2">
                  <li>Your phone number with advertisers or marketers</li>
                  <li>Your email with spam lists</li>
                  <li>Your personal data for commercial purposes</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Data Security */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-5 sm:p-4">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-6 h-6 lg:w-5 lg:h-5 text-primary" />
              <h2 className="text-2xl lg:text-xl sm:text-lg font-bold text-gray-800">
                Data Security Measures
              </h2>
            </div>
            <div className="text-gray-700 text-base lg:text-sm sm:text-xs space-y-3">
              <p>NaukariStore.com implements multiple security measures to protect your data:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li><strong>SSL/TLS Encryption:</strong> All data transmission is encrypted</li>
                <li><strong>Secure Servers:</strong> Data stored on protected servers with firewalls</li>
                <li><strong>Password Protection:</strong> User passwords are encrypted and hashed</li>
                <li><strong>Access Controls:</strong> Limited access to personal information</li>
                <li><strong>Regular Security Audits:</strong> Periodic review of security practices</li>
                <li><strong>OTP Verification:</strong> Two-factor authentication for sensitive actions</li>
              </ul>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded mt-4">
                <p className="font-semibold text-yellow-800">Important Notice:</p>
                <p className="text-yellow-700 mt-1">While we use commercially acceptable means to protect your information, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security.</p>
              </div>
            </div>
          </div>

          {/* Your Data Rights */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-5 sm:p-4">
            <div className="flex items-center gap-3 mb-4">
              <Settings className="w-6 h-6 lg:w-5 lg:h-5 text-primary" />
              <h2 className="text-2xl lg:text-xl sm:text-lg font-bold text-gray-800">
                Your Data Rights & Choices
              </h2>
            </div>
            <div className="text-gray-700 text-base lg:text-sm sm:text-xs space-y-3">
              <p>You have the following rights regarding your personal information on NaukariStore.com:</p>

              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold text-gray-800">Right to Access</h3>
                  </div>
                  <p className="text-sm text-gray-600">Request a copy of personal information we hold about you.</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Settings className="w-5 h-5 text-green-600" />
                    <h3 className="font-semibold text-gray-800">Right to Correction</h3>
                  </div>
                  <p className="text-sm text-gray-600">Update or correct inaccurate or incomplete information.</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Trash2 className="w-5 h-5 text-red-600" />
                    <h3 className="font-semibold text-gray-800">Right to Deletion</h3>
                  </div>
                  <p className="text-sm text-gray-600">Request deletion of your account and personal data.</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Bell className="w-5 h-5 text-orange-600" />
                    <h3 className="font-semibold text-gray-800">Right to Opt-Out</h3>
                  </div>
                  <p className="text-sm text-gray-600">Unsubscribe from marketing emails and SMS notifications.</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Database className="w-5 h-5 text-purple-600" />
                    <h3 className="font-semibold text-gray-800">Data Portability</h3>
                  </div>
                  <p className="text-sm text-gray-600">Request your data in a portable, machine-readable format.</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                    <h3 className="font-semibold text-gray-800">Right to Restrict</h3>
                  </div>
                  <p className="text-sm text-gray-600">Limit how we process your personal information.</p>
                </div>
              </div>

              <p className="mt-4">To exercise any of these rights, contact us at <a href="mailto:info@naukaristore.com" className="text-primary hover:underline">info@naukaristore.com</a></p>
            </div>
          </div>

          {/* Communication Preferences */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-5 sm:p-4">
            <div className="flex items-center gap-3 mb-4">
              <Bell className="w-6 h-6 lg:w-5 lg:h-5 text-primary" />
              <h2 className="text-2xl lg:text-xl sm:text-lg font-bold text-gray-800">
                Communication & Notification Preferences
              </h2>
            </div>
            <div className="text-gray-700 text-base lg:text-sm sm:text-xs space-y-3">
              <p>NaukariStore.com may send you:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li><strong>Job Alerts:</strong> New government job notifications matching your preferences</li>
                <li><strong>Result Updates:</strong> Exam results and merit list announcements</li>
                <li><strong>Admit Card Reminders:</strong> When admit cards are released</li>
                <li><strong>Deadline Alerts:</strong> Application deadline reminders</li>
                <li><strong>Service Updates:</strong> Important changes to our website or policies</li>
              </ul>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mt-4">
                <p className="font-semibold text-blue-800">Managing Your Preferences:</p>
                <ul className="list-disc list-inside text-blue-700 mt-2">
                  <li>Manage notification settings in your account dashboard</li>
                  <li>Click "Unsubscribe" link in any email to opt-out</li>
                  <li>Reply "STOP" to any SMS to unsubscribe from text alerts</li>
                  <li>Contact us to modify your communication preferences</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Third-Party Links */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-5 sm:p-4">
            <h2 className="text-2xl lg:text-xl sm:text-lg font-bold text-gray-800 mb-3">
              Third-Party Links & Services
            </h2>
            <div className="text-gray-700 text-base lg:text-sm sm:text-xs space-y-3">
              <p>NaukariStore.com contains links to external websites, particularly official government portals. Regarding these links:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>External websites have their own privacy policies</li>
                <li>We are not responsible for privacy practices of external sites</li>
                <li>We encourage you to read privacy policies of sites you visit</li>
                <li>Clicking external links may share your referrer information</li>
              </ul>
            </div>
          </div>

          {/* Children's Privacy */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-5 sm:p-4">
            <div className="flex items-center gap-3 mb-4">
              <Smartphone className="w-6 h-6 lg:w-5 lg:h-5 text-primary" />
              <h2 className="text-2xl lg:text-xl sm:text-lg font-bold text-gray-800">
                Children's Privacy
              </h2>
            </div>
            <div className="text-gray-700 text-base lg:text-sm sm:text-xs space-y-3">
              <p>NaukariStore.com is intended for users who are at least 13 years of age.</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>We do not knowingly collect personal information from children under 13</li>
                <li>If you are a parent/guardian and believe your child has provided personal information, please contact us</li>
                <li>We will take steps to delete such information from our records</li>
                <li>Users between 13-18 should have parental consent before using the website</li>
              </ul>
            </div>
          </div>

          {/* Data Retention */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-5 sm:p-4">
            <h2 className="text-2xl lg:text-xl sm:text-lg font-bold text-gray-800 mb-3">
              Data Retention Policy
            </h2>
            <div className="text-gray-700 text-base lg:text-sm sm:text-xs space-y-3">
              <p>NaukariStore.com retains your personal information for as long as necessary to:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Provide our services to you</li>
                <li>Comply with legal obligations</li>
                <li>Resolve disputes and enforce agreements</li>
                <li>Meet legitimate business purposes</li>
              </ul>
              <p className="mt-3">Upon account deletion request, we will delete or anonymize your data within 30 days, except where retention is required by law.</p>
            </div>
          </div>

          {/* Changes to Privacy Policy */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-5 sm:p-4">
            <h2 className="text-2xl lg:text-xl sm:text-lg font-bold text-gray-800 mb-3">
              Changes to This Privacy Policy
            </h2>
            <div className="text-gray-700 text-base lg:text-sm sm:text-xs space-y-3">
              <p>NaukariStore.com may update this Privacy Policy from time to time.</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Changes will be posted on this page with an updated "Last Updated" date</li>
                <li>Significant changes will be notified via email or website notification</li>
                <li>Continued use after changes constitutes acceptance of the updated policy</li>
                <li>We encourage you to review this policy periodically</li>
              </ul>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 lg:p-5 sm:p-4">
            <div className="flex items-center gap-3 mb-3">
              <Mail className="w-6 h-6 text-primary" />
              <h2 className="text-xl lg:text-lg sm:text-base font-bold text-gray-800">
                Contact Us About Privacy
              </h2>
            </div>
            <p className="text-gray-700 text-base lg:text-sm sm:text-xs mb-2">
              If you have any questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact us:
            </p>
            <div className="text-gray-700 text-base lg:text-sm sm:text-xs mb-4">
              <p><strong>Website:</strong> <a href="https://www.naukaristore.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">https://www.naukaristore.com</a></p>
              <p><strong>Email:</strong> <a href="mailto:info@naukaristore.com" className="text-primary hover:underline">info@naukaristore.com</a></p>
              <p><strong>Privacy Inquiries:</strong> <a href="mailto:privacy@naukaristore.com" className="text-primary hover:underline">privacy@naukaristore.com</a></p>
            </div>
            <button
              onClick={() => navigate('/contact')}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-semibold text-sm"
            >
              Contact Us
            </button>
          </div>

          {/* Consent Acknowledgment */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-6 lg:p-5 sm:p-4">
            <div className="flex items-start gap-3">
              <Shield className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-green-800 mb-3">Your Consent</h3>
                <p className="text-gray-800 text-base lg:text-sm font-semibold mb-2">
                  By using NaukariStore.com, you consent to this Privacy Policy and our collection, use, and sharing of your information as described.
                </p>
                <p className="text-gray-700 text-sm mb-2">
                  If you do not agree with this Privacy Policy, please do not use our website or provide your personal information.
                </p>
                <p className="text-green-700 text-sm font-semibold">
                  We value your trust and are committed to protecting your privacy. Thank you for choosing NaukariStore.com.
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

export default PrivacyPolicy;
