import React from 'react'
import Home from '../pages/Home'
import JobAlert from '../pages/job/JobAlert'
import Result from '../pages/result/Result'
import AdmitCard from '../pages/admitCard/AdmitCard'
import NewsPaperGallery from '../pages/NewsPaperGallery'
import GovtLinkForm from '../pages/GovtLinkForm'

import Admission from '../pages/admission/AdmissionAlert'
import Syllabus from '../pages/Syllabus'
import AnswerKey from '../pages/answerkey/AnswerKeyAlert'
import Footer from '../components/Footer/Footer'
import HelpSession from '../helpSession/HelpSession'


const HandlePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Home />
      
      {/* Desktop Layout - 88.png (3x3 grid) */}
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

          {/* Second Row */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div>
              <NewsPaperGallery />
            </div>
            <div>
              <GovtLinkForm />
            </div>
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
              <Syllabus  />
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
              <NewsPaperGallery />
            </div>
          </div>
          
          {/* Third Row - 2 columns */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <GovtLinkForm />
            </div>
            {/* <div>
              <LatestNotice />
            </div> */}
          </div>
          
          {/* Fourth Row - 2 columns */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Admission />
            </div>
            <div>
              <Syllabus />
            </div>
          </div>
          
          {/* Fifth Row - Single column for AnswerKey */}
          <div className="mt-6">
            <AnswerKey />
          </div>
        </div>
      </div>

      {/* Mobile Layout - 99.png (single column) */}
      <div className="md:hidden">
        <div className="px-4 py-6 space-y-6">
          {/* Results First (as shown in 99.png) */}
          <div>
            <Result />
          </div>
          
          {/* Latest Jobs Second (as shown in 99.png) */}
          <div>
            <JobAlert />
          </div>
          
          {/* Admit Cards (likely next in sequence) */}
          <div>
            <AdmitCard />
          </div>
          
          {/* Other sections in single column */}
          <NewsPaperGallery />
          <GovtLinkForm />
          {/* <LatestNotice /> */}
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