import { useState } from 'react'
import SearchForm from '../SearchForm/SearchForm'
import NewsCard from '../NewsCard/NewsCard'
import Preloader from '../Preloader/Preloader'
import { searchNews } from '../../utils/NewsApi'
import './Main.css'

function Main() {
  const [isLoading, setIsLoading] = useState(false)
  const [articles, setArticles] = useState([])
  const [hasSearched, setHasSearched] = useState(false)
  const [searchError, setSearchError] = useState(null)
  const [displayedCount, setDisplayedCount] = useState(3)

  const CARDS_PER_PAGE = 3

  const handleSearch = async (keyword) => {
    setIsLoading(true)
    setHasSearched(true)
    setSearchError(null)
    setDisplayedCount(CARDS_PER_PAGE)
    
    try {
      const data = await searchNews(keyword)
      
      const transformedArticles = data.articles.map((article, index) => ({
        id: `${article.publishedAt}-${index}`,
        title: article.title,
        description: article.description || article.content || 'No description available',
        url: article.url,
        urlToImage: article.urlToImage,
        publishedAt: article.publishedAt,
        source: {
          id: article.source.id,
          name: article.source.name
        },
        author: article.author,
        content: article.content
      }))
      
      setArticles(transformedArticles)
    } catch (error) {
      if (error.message === 'Please enter a keyword') {
        setSearchError(error.message)
      } else {
        setSearchError('Sorry, something went wrong during the request. There may be a connection issue or the server may be down. Please try again later.')
      }
      setArticles([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleShowMore = () => {
    setDisplayedCount(prevCount => prevCount + CARDS_PER_PAGE)
  }

  const displayedArticles = articles.slice(0, displayedCount)
  const hasMoreArticles = displayedCount < articles.length

  return (
    <section className="main">
      <div className="main__hero">
        <h2 className="main__title">What's going on in the world?</h2>
        <p className="main__subtitle">
          Find the latest news on any topic and save them in your personal account.
        </p>
        <SearchForm onSearch={handleSearch} />
      </div>

      {hasSearched && (
        <div className="main__results">
          <h3 className="main__results-title">Search results</h3>
          {isLoading ? (
            <Preloader />
          ) : searchError ? (
            <p className="main__error">{searchError}</p>
          ) : (
            <>
              {articles.length === 0 ? (
                <div className="main__not-found">
                  <div className="main__not-found-icon" />
                  <h3 className="main__not-found-title">Nothing found</h3>
                  <p className="main__not-found-text">
                    Sorry, but nothing matched your search terms.
                  </p>
                </div>
              ) : (
                <>
                  <div className="main__cards">
                    {displayedArticles.map((article) => (
                      <NewsCard key={article.id} article={article} />
                    ))}
                  </div>
                  {hasMoreArticles && (
                    <button 
                      className="main__show-more"
                      onClick={handleShowMore}
                      type="button"
                    >
                      Show more
                    </button>
                  )}
                </>
              )}
            </>
          )}
        </div>
      )}
    </section>
  )
}

export default Main
