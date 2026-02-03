import { Link } from 'react-router-dom'
import Navigation from '../Navigation/Navigation'
import './Header.css'

function Header({ onLoginClick }) {
  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo">
          NewsExplorer
        </Link>
        <div className="header__nav-wrapper">
          <Navigation />
          <button 
            className="header__signin-button"
            onClick={onLoginClick}
            type="button"
          >
            Sign in
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
