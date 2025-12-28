import React from 'react'
import  Home from '../pages/Home'
import JobAlert from '../pages/JobAlert'
import Result from '../pages/result/Result'
import AdmitCard from '../pages/admitCard/AdmitCard'
import NewsPaperGallery from '../pages/NewsPaperGallery'
import GovtLinkForm from '../pages/GovtLinkForm'
import LatestNotice from '../pages/LatestNotice'
import Admission from '../pages/Admission'
import Syllabus from '../pages/Syllabus'
import AnswerKey from '../pages/AnswerKey'
import Footer from '../components/Footer/Footer'
import HelpSession from '../helpSession/HelpSession'

const HandlePage = () => {
  return (
    <div className="min-h-screen  bg-gray-100">
      <Home />
     
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* First Row */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <JobAlert />
          <Result />
          <AdmitCard />
        </div>

        {/* Second Row */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <NewsPaperGallery />
          <GovtLinkForm />
          <LatestNotice />
        </div>

        {/* Third Row */}
        <div className="grid md:grid-cols-3 gap-6">
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