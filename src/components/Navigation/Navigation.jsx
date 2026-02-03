import { Link, useLocation } from 'react-router-dom'
import './Navigation.css'

function Navigation() {
  const location = useLocation()

  return (
    <nav className="navigation">
      <Link 
        to="/" 
        className={`navigation__link ${location.pathname === '/' ? 'navigation__link_active' : ''}`}
      >
        Home
      </Link>
      <Link 
        to="/saved-news" 
        className={`navigation__link ${location.pathname === '/saved-news' ? 'navigation__link_active' : ''}`}
      >
        Saved Articles
      </Link>
    </nav>
  )
}

export default Navigation
