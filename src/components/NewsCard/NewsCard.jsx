import { useState } from 'react'
import { formatDate } from '../../utils/mockData'
import { saveArticle, deleteArticle } from '../../utils/api'
import { isAuthenticated } from '../../utils/auth'
import './NewsCard.css'

function NewsCard({ article, isSaved = false, onSave, onDelete }) {
  const [saved, setSaved] = useState(isSaved)
  const [isSaving, setIsSaving] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  const {
    _id,
    title,
    description,
    publishedAt,
    source,
    urlToImage,
    url
  } = article

  const isUserLoggedIn = isAuthenticated()

  const handleCardClick = () => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleBookmarkClick = async (e) => {
    e.stopPropagation()
    
    if (!isUserLoggedIn) {
      setShowTooltip(true)
      setTimeout(() => setShowTooltip(false), 2000)
      return
    }
    
    if (saved && isSaved) {
      setIsSaving(true)
      try {
        await deleteArticle(_id)
        setSaved(false)
        if (onDelete) {
          onDelete(article)
        }
      } catch (error) {
      } finally {
        setIsSaving(false)
      }
    } else if (!saved) {
      setIsSaving(true)
      try {
        await saveArticle(article)
        setSaved(true)
        if (onSave) {
          onSave(article)
        }
      } catch (error) {
      } finally {
        setIsSaving(false)
      }
    }
  }

  return (
    <article className="news-card" onClick={handleCardClick}>
      <div className="news-card__image">
        {urlToImage && (
          <img 
            src={urlToImage} 
            alt={title}
            onError={(e) => {
              e.target.style.display = 'none'
            }}
          />
        )}
        <div className="news-card__bookmark-container">
          <button
            className={`news-card__bookmark ${saved ? 'news-card__bookmark_active' : ''} ${!isUserLoggedIn ? 'news-card__bookmark_inactive' : ''}`}
            onClick={handleBookmarkClick}
            type="button"
            aria-label={saved ? 'Remove bookmark' : 'Add bookmark'}
            disabled={isSaving}
            onMouseEnter={() => !isUserLoggedIn && setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            {saved ? '🔖' : '🏷️'}
          </button>
          {showTooltip && !isUserLoggedIn && (
            <div className="news-card__tooltip">Sign in to save articles</div>
          )}
        </div>
      </div>
      <div className="news-card__content">
        <p className="news-card__date">{formatDate(publishedAt)}</p>
        <h4 className="news-card__title">{title}</h4>
        <p className="news-card__text">{description}</p>
        <span className="news-card__source">{source.name}</span>
      </div>
    </article>
  )
}

export default NewsCard
