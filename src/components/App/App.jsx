import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from '../Header/Header'
import Main from '../Main/Main'
import SavedNews from '../SavedNews/SavedNews'
import About from '../About/About'
import Footer from '../Footer/Footer'
import LoginModal from '../LoginModal/LoginModal'
import RegisterModal from '../RegisterModal/RegisterModal'
import './App.css'

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)

  const handleOpenLoginModal = () => {
    setIsLoginModalOpen(true)
  }

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false)
  }

  const handleOpenRegisterModal = () => {
    setIsRegisterModalOpen(true)
  }

  const handleCloseRegisterModal = () => {
    setIsRegisterModalOpen(false)
  }

  const handleSwitchToRegister = () => {
    setIsLoginModalOpen(false)
    setIsRegisterModalOpen(true)
  }

  const handleSwitchToLogin = () => {
    setIsRegisterModalOpen(false)
    setIsLoginModalOpen(true)
  }

  return (
    <BrowserRouter>
      <div className="app">
        <Header onLoginClick={handleOpenLoginModal} />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/saved-news" element={<SavedNews />} />
        </Routes>
        <About />
        <Footer />

        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={handleCloseLoginModal}
          onSwitchToRegister={handleSwitchToRegister}
        />

        <RegisterModal
          isOpen={isRegisterModalOpen}
          onClose={handleCloseRegisterModal}
          onSwitchToLogin={handleSwitchToLogin}
        />
      </div>
    </BrowserRouter>
  )
}

export default App
