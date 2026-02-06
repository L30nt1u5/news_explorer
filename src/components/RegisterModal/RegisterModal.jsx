import { useState } from 'react'
import ModalWithForm from '../ModalWithForm/ModalWithForm'
import './RegisterModal.css'

function RegisterModal({ isOpen, onClose, onSwitchToLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
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

    if (!username) {
      newErrors.username = 'Username is required'
    } else if (username.length < 2) {
      newErrors.username = 'Username must be at least 2 characters'
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      setEmail('')
      setPassword('')
      setUsername('')
      setErrors({})
    }
  }

  const handleClose = () => {
    setEmail('')
    setPassword('')
    setUsername('')
    setErrors({})
    onClose()
  }

  const handleSwitchToLogin = () => {
    handleClose()
    onSwitchToLogin()
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Sign up"
      onClose={handleClose}
      buttonText="Sign up"
      onSubmit={handleSubmit}
      altLink={{
        text: 'or Sign in',
        onClick: handleSwitchToLogin
      }}
    >
      <label className="modal__label" htmlFor="register-email">
        Email
      </label>
      <input
        id="register-email"
        type="email"
        className={`modal__input ${errors.email ? 'modal__input_error' : ''}`}
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      {errors.email && <span className="modal__error">{errors.email}</span>}

      <label className="modal__label" htmlFor="register-password">
        Password
      </label>
      <input
        id="register-password"
        type="password"
        className={`modal__input ${errors.password ? 'modal__input_error' : ''}`}
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={6}
      />
      {errors.password && <span className="modal__error">{errors.password}</span>}

      <label className="modal__label" htmlFor="register-username">
        Username
      </label>
      <input
        id="register-username"
        type="text"
        className={`modal__input ${errors.username ? 'modal__input_error' : ''}`}
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        minLength={2}
      />
      {errors.username && <span className="modal__error">{errors.username}</span>}
    </ModalWithForm>
  )
}

export default RegisterModal
