import { useState } from 'react'
import ModalWithForm from '../ModalWithForm/ModalWithForm'
import './LoginModal.css'

function LoginModal({ isOpen, onClose, onSwitchToRegister }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!email) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!password) {
      newErrors.password = 'Password is required'
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      setEmail('')
      setPassword('')
      setErrors({})
    }
  }

  const handleClose = () => {
    setEmail('')
    setPassword('')
    setErrors({})
    onClose()
  }

  const handleSwitchToRegister = () => {
    handleClose()
    onSwitchToRegister()
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Sign in"
      onClose={handleClose}
      buttonText="Sign in"
      onSubmit={handleSubmit}
      altLink={{
        text: 'or Sign up',
        onClick: handleSwitchToRegister
      }}
    >
      <label className="modal__label" htmlFor="login-email">
        Email
      </label>
      <input
        id="login-email"
        type="email"
        className={`modal__input ${errors.email ? 'modal__input_error' : ''}`}
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      {errors.email && <span className="modal__error">{errors.email}</span>}

      <label className="modal__label" htmlFor="login-password">
        Password
      </label>
      <input
        id="login-password"
        type="password"
        className={`modal__input ${errors.password ? 'modal__input_error' : ''}`}
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={6}
      />
      {errors.password && <span className="modal__error">{errors.password}</span>}
    </ModalWithForm>
  )
}

export default LoginModal
