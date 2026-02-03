// api.js - Simulated backend API responses for article management

const STORAGE_KEY = 'newsExplorerSavedArticles'

// Initialize with some mock saved articles
const initializeSavedArticles = () => {
  const existing = localStorage.getItem(STORAGE_KEY)
  if (!existing) {
    const mockArticles = [
      {
        _id: '65f7368dfb74bd6a92114c85',
        title: 'Climate Summit Reaches Historic Agreement',
        description: 'World leaders have reached a groundbreaking agreement on climate action at the International Climate Summit.',
        url: 'https://example.com/climate-summit',
        urlToImage: 'https://images.unsplash.com/photo-1569163139394-de4798aa62b6?w=800',
        publishedAt: '2026-02-02T14:20:00Z',
        source: {
          id: 'bbc-news',
          name: 'BBC News'
        },
        author: 'Michael Chen',
        keyword: 'climate'
      },
      {
        _id: '65f7368dfb74bd6a92114c86',
        title: 'Breakthrough in Quantum Computing Announced',
        description: 'Scientists at MIT have announced a major breakthrough in quantum computing.',
        url: 'https://example.com/quantum-computing',
        urlToImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800',
        publishedAt: '2026-02-01T11:45:00Z',
        source: {
          id: 'science-daily',
          name: 'Science Daily'
        },
        author: 'Dr. Emily Rodriguez',
        keyword: 'technology'
      }
    ]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockArticles))
  }
}

// Initialize on load
initializeSavedArticles()

// Get all saved articles
export const getSavedArticles = () => {
  return new Promise((resolve, reject) => {
    // Simulate network delay
    setTimeout(() => {
      try {
        const articlesStr = localStorage.getItem(STORAGE_KEY)
        const articles = articlesStr ? JSON.parse(articlesStr) : []
        resolve(articles)
      } catch (error) {
        reject({ message: 'Failed to fetch saved articles' })
      }
    }, 500)
  })
}

// Save an article
export const saveArticle = (article, keyword = '') => {
  return new Promise((resolve, reject) => {
    // Simulate network delay
    setTimeout(() => {
      try {
        if (!article) {
          reject({ message: 'Article is required' })
          return
        }

        const articlesStr = localStorage.getItem(STORAGE_KEY)
        const articles = articlesStr ? JSON.parse(articlesStr) : []

        // Check if article is already saved
        const isDuplicate = articles.some(a => a.url === article.url)
        if (isDuplicate) {
          reject({ message: 'Article is already saved' })
          return
        }

        // Create new saved article with _id
        const savedArticle = {
          _id: 'article_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now(),
          url: article.url,
          title: article.title,
          description: article.description,
          urlToImage: article.urlToImage,
          publishedAt: article.publishedAt,
          source: article.source,
          author: article.author,
          keyword: keyword || extractKeywordFromArticle(article)
        }

        // Add to array
        articles.push(savedArticle)

        // Save to localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(articles))

        resolve(savedArticle)
      } catch (error) {
        reject({ message: 'Failed to save article' })
      }
    }, 500)
  })
}

// Delete a saved article
export const deleteArticle = (articleId) => {
  return new Promise((resolve, reject) => {
    // Simulate network delay
    setTimeout(() => {
      try {
        if (!articleId) {
          reject({ message: 'Article ID is required' })
          return
        }

        const articlesStr = localStorage.getItem(STORAGE_KEY)
        let articles = articlesStr ? JSON.parse(articlesStr) : []

        // Find and remove article
        const initialLength = articles.length
        articles = articles.filter(a => a._id !== articleId)

        if (articles.length === initialLength) {
          reject({ message: 'Article not found' })
          return
        }

        // Save updated array
        localStorage.setItem(STORAGE_KEY, JSON.stringify(articles))

        resolve({ message: 'Article deleted successfully', articleId: articleId })
      } catch (error) {
        reject({ message: 'Failed to delete article' })
      }
    }, 500)
  })
}

// Check if article is saved
export const isArticleSaved = (articleUrl) => {
  return new Promise((resolve) => {
    try {
      const articlesStr = localStorage.getItem(STORAGE_KEY)
      const articles = articlesStr ? JSON.parse(articlesStr) : []
      const isSaved = articles.some(a => a.url === articleUrl)
      resolve(isSaved)
    } catch (error) {
      resolve(false)
    }
  })
}

// Get saved article by URL
export const getSavedArticleByUrl = (articleUrl) => {
  return new Promise((resolve, reject) => {
    try {
      const articlesStr = localStorage.getItem(STORAGE_KEY)
      const articles = articlesStr ? JSON.parse(articlesStr) : []
      const savedArticle = articles.find(a => a.url === articleUrl)

      if (savedArticle) {
        resolve(savedArticle)
      } else {
        reject({ message: 'Article not found' })
      }
    } catch (error) {
      reject({ message: 'Failed to fetch article' })
    }
  })
}

// Helper function to extract keyword from article
const extractKeywordFromArticle = (article) => {
  // Simple extraction from title
  const words = article.title.split(' ')
  // Return first significant word
  for (const word of words) {
    if (word.length > 3) {
      return word.toLowerCase()
    }
  }
  return 'news'
}

export default {
  getSavedArticles,
  saveArticle,
  deleteArticle,
  isArticleSaved,
  getSavedArticleByUrl
}
  } catch (error) {
    console.error('Error searching everything:', error)
    throw error
  }
}

export default api
