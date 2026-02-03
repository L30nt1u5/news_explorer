import { useEffect } from 'react'
import './ModalWithForm.css'

function ModalWithForm({ isOpen, title, children, onClose, buttonText, onSubmit, altLink }) {
  useEffect(() => {
    if (!isOpen) return

    const handleEscapeKey = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscapeKey)
    return () => {
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (onSubmit) {
      onSubmit(e)
    }
  }

  return (
    <div className="modal" role="dialog" aria-modal="true" onClick={handleOverlayClick}>
      <div className="modal__container">
        <button 
          type="button" 
          className="modal__close" 
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>
        <h2 className="modal__title">{title}</h2>
        <form className="modal__form" onSubmit={handleSubmit}>
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
          {altLink && (
            <button 
              type="button" 
              className="modal__alt-link"
              onClick={altLink.onClick}
            >
              {altLink.text}
            </button>
          )}
        </form>
      </div>
    </div>
  )
}

export default ModalWithForm
