import { Outlet } from 'react-router-dom'
import CyberCafeNavbar from '../components/CyberCafe/CyberCafeNavbar'
import Footer from '../components/Footer/Footer'

const HandleCyberPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Cyber Cafe Navbar */}
      <CyberCafeNavbar />

      {/* Main Content - flex-grow to push footer down */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Spacer before footer */}
      <div className="mt-8" />

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default HandleCyberPage
