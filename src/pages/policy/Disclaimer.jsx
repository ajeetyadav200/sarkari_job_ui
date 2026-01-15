import { useNavigate } from 'react-router-dom';
import { AlertTriangle, ArrowLeft, Info, ExternalLink, Shield, AlertCircle, Ban, FileWarning, Globe, Phone } from 'lucide-react';

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
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="text-gray-700 text-base lg:text-sm sm:text-xs">
              Please read this disclaimer carefully before using <strong>NaukariStore.com</strong> (<a href="https://www.naukaristore.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">https://www.naukaristore.com</a>). This disclaimer governs your use of our website and the information provided on it.
            </p>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-6 lg:space-y-4">
          {/* Critical Notice Banner */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl shadow-lg p-6 lg:p-5 sm:p-4 text-white">
            <div className="flex items-start gap-3">
              <Shield className="w-8 h-8 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl lg:text-xl sm:text-lg font-bold mb-3">
                  CRITICAL NOTICE - NOT A GOVERNMENT WEBSITE
                </h2>
                <p className="text-white/95 text-base lg:text-sm sm:text-xs mb-3">
                  <strong>NaukariStore.com</strong> is an INDEPENDENT, PRIVATE job information portal. We are:
                </p>
                <ul className="list-disc list-inside space-y-2 text-white/90">
                  <li><strong>NOT</strong> an official government website</li>
                  <li><strong>NOT</strong> affiliated with, endorsed by, or connected to any government organization</li>
                  <li><strong>NOT</strong> associated with any recruitment board, PSC, SSC, UPSC, or examination authority</li>
                  <li><strong>NOT</strong> authorized to conduct recruitment, issue admit cards, or publish results</li>
                </ul>
              </div>
            </div>
          </div>

          {/* General Disclaimer */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-5 sm:p-4">
            <div className="flex items-center gap-3 mb-4">
              <Info className="w-6 h-6 lg:w-5 lg:h-5 text-primary" />
              <h2 className="text-2xl lg:text-xl sm:text-lg font-bold text-gray-800">
                General Disclaimer
              </h2>
            </div>
            <div className="text-gray-700 text-base lg:text-sm sm:text-xs space-y-3">
              <p>The information on <strong>NaukariStore.com</strong> is provided for general information and educational purposes only. While we strive to keep information accurate and up-to-date, we make NO representations or warranties about:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>The completeness, accuracy, reliability, or availability of any information</li>
                <li>The timeliness of job notifications, exam dates, results, or admit card releases</li>
                <li>The authenticity of information gathered from various sources</li>
                <li>The suitability of information for any particular purpose</li>
                <li>The continuous availability or error-free operation of the website</li>
              </ul>
              <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded mt-4">
                <p className="font-bold text-red-800">ANY RELIANCE YOU PLACE ON INFORMATION FROM NAUKARISTORE.COM IS STRICTLY AT YOUR OWN RISK.</p>
              </div>
            </div>
          </div>

          {/* What We Do NOT Do */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-5 sm:p-4">
            <div className="flex items-center gap-3 mb-4">
              <Ban className="w-6 h-6 lg:w-5 lg:h-5 text-red-600" />
              <h2 className="text-2xl lg:text-xl sm:text-lg font-bold text-gray-800">
                What NaukariStore.com Does NOT Do
              </h2>
            </div>
            <div className="text-gray-700 text-base lg:text-sm sm:text-xs">
              <p className="mb-4">To avoid any confusion, NaukariStore.com clearly states that we do NOT:</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="font-semibold text-red-800 mb-2">Recruitment & Jobs</h3>
                  <ul className="list-disc list-inside space-y-1 text-red-700 text-sm">
                    <li>Conduct any recruitment process</li>
                    <li>Accept job applications</li>
                    <li>Guarantee employment or selection</li>
                    <li>Provide job placements</li>
                    <li>Issue appointment letters</li>
                  </ul>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="font-semibold text-red-800 mb-2">Examinations</h3>
                  <ul className="list-disc list-inside space-y-1 text-red-700 text-sm">
                    <li>Conduct any examinations</li>
                    <li>Issue admit cards or hall tickets</li>
                    <li>Publish official results</li>
                    <li>Release official answer keys</li>
                    <li>Issue certificates or mark sheets</li>
                  </ul>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="font-semibold text-red-800 mb-2">Financial</h3>
                  <ul className="list-disc list-inside space-y-1 text-red-700 text-sm">
                    <li>Charge fees for job information</li>
                    <li>Accept payments for applications</li>
                    <li>Sell courses or study materials</li>
                    <li>Provide coaching services</li>
                    <li>Process refunds for any service</li>
                  </ul>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="font-semibold text-red-800 mb-2">Official Services</h3>
                  <ul className="list-disc list-inside space-y-1 text-red-700 text-sm">
                    <li>Verify documents or certificates</li>
                    <li>Provide official notifications</li>
                    <li>Handle grievances or complaints</li>
                    <li>Offer career counseling</li>
                    <li>Provide legal advice</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Information Sources */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-5 sm:p-4">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-6 h-6 lg:w-5 lg:h-5 text-primary" />
              <h2 className="text-2xl lg:text-xl sm:text-lg font-bold text-gray-800">
                Information Sources & Accuracy
              </h2>
            </div>
            <div className="text-gray-700 text-base lg:text-sm sm:text-xs space-y-3">
              <p>Information on NaukariStore.com is compiled from:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Official government websites and portals</li>
                <li>Public notices and advertisements</li>
                <li>Press releases and news sources</li>
                <li>Third-party information providers</li>
              </ul>

              <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 rounded mt-4">
                <p className="font-semibold text-yellow-800 mb-2">Accuracy Warning:</p>
                <ul className="list-disc list-inside space-y-1 text-yellow-700">
                  <li>We cannot guarantee 100% accuracy of any information</li>
                  <li>Dates, eligibility criteria, fees may change without notice</li>
                  <li>There may be delays in updating information</li>
                  <li>Typographical errors or inaccuracies may occur</li>
                  <li>Information may become outdated between updates</li>
                </ul>
              </div>

              <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded mt-4">
                <p className="font-semibold text-green-800 mb-2">Mandatory Action:</p>
                <p className="text-green-700">Users MUST verify ALL information from the official website of the respective government organization before:</p>
                <ul className="list-disc list-inside ml-4 mt-2 text-green-700">
                  <li>Applying for any job or examination</li>
                  <li>Paying any application fees</li>
                  <li>Making travel plans for examinations</li>
                  <li>Taking any career-related decisions</li>
                </ul>
              </div>
            </div>
          </div>

          {/* External Links */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-5 sm:p-4">
            <div className="flex items-center gap-3 mb-4">
              <ExternalLink className="w-6 h-6 lg:w-5 lg:h-5 text-primary" />
              <h2 className="text-2xl lg:text-xl sm:text-lg font-bold text-gray-800">
                External Links & Third-Party Websites
              </h2>
            </div>
            <div className="text-gray-700 text-base lg:text-sm sm:text-xs space-y-3">
              <p>NaukariStore.com contains links to external websites for user convenience. Regarding these links:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>We have no control over external website content, availability, or accuracy</li>
                <li>Links do NOT imply endorsement or partnership by NaukariStore.com</li>
                <li>We are not responsible for privacy policies of external sites</li>
                <li>External websites may have different terms and conditions</li>
                <li>Users access external links entirely at their own risk</li>
                <li>We shall not be liable for any loss from using external websites</li>
              </ul>
            </div>
          </div>

          {/* Limitation of Liability */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-5 sm:p-4">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6 lg:w-5 lg:h-5 text-red-600" />
              <h2 className="text-2xl lg:text-xl sm:text-lg font-bold text-gray-800">
                Limitation of Liability
              </h2>
            </div>
            <div className="text-gray-700 text-base lg:text-sm sm:text-xs space-y-3">
              <p>NaukariStore.com and its owners shall NOT be liable for any loss or damage including:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Direct, indirect, incidental, or consequential damages</li>
                <li>Loss of data, information, or profits</li>
                <li>Loss of employment opportunities</li>
                <li>Missed job applications or examination dates</li>
                <li>Wrong decisions based on website information</li>
                <li>Financial loss from incorrect fee information</li>
                <li>Technical issues, downtime, or service interruptions</li>
                <li>Errors, omissions, or inaccuracies in content</li>
                <li>Third-party actions or external website content</li>
                <li>Any damages arising from the use or inability to use this website</li>
              </ul>
            </div>
          </div>

          {/* Fraud Warning */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-5 sm:p-4">
            <div className="flex items-center gap-3 mb-4">
              <FileWarning className="w-6 h-6 lg:w-5 lg:h-5 text-orange-600" />
              <h2 className="text-2xl lg:text-xl sm:text-lg font-bold text-gray-800">
                Fraud Alert & Warning
              </h2>
            </div>
            <div className="text-gray-700 text-base lg:text-sm sm:text-xs">
              <div className="bg-orange-50 border-2 border-orange-400 rounded-lg p-4">
                <p className="font-bold text-orange-800 text-lg mb-3">BEWARE OF FRAUD!</p>
                <ul className="list-disc list-inside space-y-2 text-orange-700">
                  <li><strong>NaukariStore.com does NOT charge any fees</strong> for job information</li>
                  <li><strong>Never pay money</strong> to anyone claiming to offer jobs through our website</li>
                  <li><strong>No guaranteed jobs</strong> - Anyone promising guaranteed selection is a fraudster</li>
                  <li><strong>Report suspicious activity</strong> to local police if you encounter fraud</li>
                  <li><strong>Verify official channels</strong> - Always apply through official government websites</li>
                </ul>
                <p className="mt-4 text-orange-800 font-semibold">
                  If anyone contacts you claiming to be from NaukariStore.com and asks for money, it is a SCAM. Please report immediately.
                </p>
              </div>
            </div>
          </div>

          {/* Copyright Notice */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-5 sm:p-4">
            <h2 className="text-2xl lg:text-xl sm:text-lg font-bold text-gray-800 mb-3">
              Copyright & Intellectual Property
            </h2>
            <div className="text-gray-700 text-base lg:text-sm sm:text-xs space-y-3">
              <p>Regarding intellectual property on NaukariStore.com:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Job notifications and official documents are property of respective government organizations</li>
                <li>NaukariStore.com claims no ownership over official government content</li>
                <li>All trademarks, logos belong to their respective owners</li>
                <li>We use official information under fair use for informational purposes</li>
                <li>Original website content and design are property of NaukariStore.com</li>
              </ul>
            </div>
          </div>

          {/* User Responsibility */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-5 sm:p-4">
            <h2 className="text-2xl lg:text-xl sm:text-lg font-bold text-gray-800 mb-3">
              User Responsibility & Agreement
            </h2>
            <div className="text-gray-700 text-base lg:text-sm sm:text-xs space-y-3">
              <p>By using NaukariStore.com, you acknowledge and agree that:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>You are solely responsible for verifying all information before use</li>
                <li>You will check official websites for accurate and updated information</li>
                <li>You understand NaukariStore.com is not liable for any consequences</li>
                <li>You will not hold us responsible for missed opportunities or incorrect information</li>
                <li>You accept all risks associated with using information from this website</li>
                <li>You have read and understood this disclaimer in its entirety</li>
              </ul>
            </div>
          </div>

          {/* Changes to Disclaimer */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-5 sm:p-4">
            <h2 className="text-2xl lg:text-xl sm:text-lg font-bold text-gray-800 mb-3">
              Changes to This Disclaimer
            </h2>
            <div className="text-gray-700 text-base lg:text-sm sm:text-xs space-y-3">
              <p>NaukariStore.com may update this Disclaimer at any time without prior notice.</p>
              <p>Changes will be posted on this page with an updated "Last Updated" date.</p>
              <p>Continued use of NaukariStore.com after changes constitutes acceptance of the modified disclaimer.</p>
              <p>We encourage users to review this Disclaimer periodically.</p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 lg:p-5 sm:p-4">
            <div className="flex items-center gap-3 mb-3">
              <Phone className="w-6 h-6 text-primary" />
              <h2 className="text-xl lg:text-lg sm:text-base font-bold text-gray-800">
                Questions or Concerns?
              </h2>
            </div>
            <p className="text-gray-700 text-base lg:text-sm sm:text-xs mb-2">
              If you have any questions about this Disclaimer, please contact us:
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

          {/* Final Notice */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-300 rounded-xl p-6 lg:p-5 sm:p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-red-800 mb-3">Final Important Notice</h3>
                <p className="text-gray-800 text-base lg:text-sm font-semibold mb-2">
                  By using NaukariStore.com, you acknowledge that you have read, understood, and agree to be bound by this Disclaimer.
                </p>
                <p className="text-gray-700 text-sm mb-2">
                  <strong>If you do not agree with this Disclaimer, please do not use this website.</strong>
                </p>
                <p className="text-red-700 text-sm font-semibold">
                  ALWAYS verify information from official government sources. NaukariStore.com is NOT responsible for any decisions you make based on information provided on this website.
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
