import { useState, useEffect } from 'react'
import NewsCard from '../NewsCard/NewsCard'
import { getSavedArticles, deleteArticle } from '../../utils/api'
import './SavedNews.css'

function SavedNews() {
  const [savedArticles, setSavedArticles] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadSavedArticles()
  }, [])

  const loadSavedArticles = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const articles = await getSavedArticles()
      setSavedArticles(articles)
    } catch (err) {
      setError('Failed to load saved articles')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteArticle = async (articleToDelete) => {
    try {
      await deleteArticle(articleToDelete._id)
      setSavedArticles(savedArticles.filter(
        (article) => article._id !== articleToDelete._id
      ))
    } catch (err) {
    }
  }

  const keywords = [...new Set(savedArticles.map(article => article.keyword).filter(Boolean))]

  if (isLoading) {
    return (
      <section className="saved-news">
        <div className="saved-news__header">
          <h2 className="saved-news__title">Saved articles</h2>
        </div>
        <p className="saved-news__loading">Loading...</p>
      </section>
    )
  }

  return (
    <section className="saved-news">
      <div className="saved-news__header">
        <h2 className="saved-news__title">Saved articles</h2>
        {savedArticles.length > 0 && keywords.length > 0 && (
          <p className="saved-news__keywords">
            By keywords: <strong>{keywords.join(', ')}</strong>
          </p>
        )}
        <p className="saved-news__subtitle">
          {savedArticles.length === 0
            ? 'You have no saved articles yet'
            : `You have ${savedArticles.length} saved ${savedArticles.length === 1 ? 'article' : 'articles'}`}
        </p>
      </div>

      {error && <p className="saved-news__error">{error}</p>}

      <div className="saved-news__cards">
        {savedArticles.length === 0 ? (
          <p className="saved-news__empty">Start saving articles to see them here!</p>
        ) : (
          savedArticles.map((article) => (
            <NewsCard 
              key={article._id} 
              article={article} 
              isSaved={true}
              onDelete={handleDeleteArticle}
            />
          ))
        )}
      </div>
    </section>
  )
}

export default SavedNews
