import React from 'react'
import Home from '../pages/Home'
import JobAlert from '../pages/job/JobAlert'
import Result from '../pages/result/Result'
import AdmitCard from '../pages/admitCard/AdmitCard'
import Admission from '../pages/admission/AdmissionAlert'
import Syllabus from '../pages/governmentService/GovernmentServiceAlert'
import AnswerKey from '../pages/answerkey/AnswerKeyAlert'
import Footer from '../components/Footer/Footer'
import HelpSession from '../helpSession/HelpSession'

const HandlePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Home />
      
      {/* Desktop Layout - 3x3 grid */}
      <div className="hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* First Row */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div>
              <JobAlert />
            </div>
            <div>
              <Result />
            </div>
            <div>
              <AdmitCard />
            </div>
          </div>

          {/* Second Row - Now only one component, can adjust as needed */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            {/* Left empty or add another component later */}
            <div></div>
            <div></div>
            {/* <div>
              <LatestNotice />
            </div> */}
          </div>

          {/* Third Row */}
          <div className="grid grid-cols-3 gap-6">
            <div>
              <Admission />
            </div>
            <div>
              <Syllabus />
            </div>
            <div>
              <AnswerKey />
            </div>
          </div>
        </div>
      </div>

      {/* Tablet Layout - 2 columns */}
      <div className="hidden md:block lg:hidden">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {/* First Row - 2 columns */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <JobAlert />
            </div>
            <div>
              <Result />
            </div>
          </div>
          
          {/* Second Row - 2 columns */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <AdmitCard />
            </div>
            <div>
              <Admission />
            </div>
          </div>
          
          {/* Third Row - 2 columns */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <Syllabus />
            </div>
            <div>
              <AnswerKey />
            </div>
          </div>
          
          {/* Fourth Row - Single column for any additional component */}
          {/* <div className="mt-6">
            <LatestNotice />
          </div> */}
        </div>
      </div>

      {/* Mobile Layout - single column */}
      <div className="md:hidden">
        <div className="px-4 py-6 space-y-6">
          {/* Results First */}
          <div>
             <JobAlert />
           
          </div>
          
          {/* Latest Jobs Second */}
          <div>
            <Result />
          </div>
          
          {/* Admit Cards */}
          <div>
            <AdmitCard />
          </div>
          
          {/* Other sections in single column */}
          <Admission />
          <Syllabus />
          <AnswerKey />
        </div>
      </div>

      <Footer />
      <HelpSession />
    </div>
  )
}

export default HandlePage