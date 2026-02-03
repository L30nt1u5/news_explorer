// NewsApi.js - Third-party API interactions using vanilla JavaScript fetch()

const NEWS_API_KEY = '19a885fb295a4cc38b4fba749c79146b'

// Use proxy URL in production, direct URL in development
const NEWS_API_BASE_URL = import.meta.env.MODE === 'production'
  ? 'https://nomoreparties.co/news/v2/everything'
  : 'https://newsapi.org/v2/everything'

// Helper function to check response status
const checkResponse = (res) => {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Error: ${res.status}`)
}

// Search for news articles using the /everything endpoint
export const searchNews = (keyword, pageSize = 100) => {
  if (!keyword || keyword.trim().length === 0) {
    return Promise.reject({ message: 'Please enter a keyword' })
  }

  const today = new Date()
  const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)

  const params = new URLSearchParams({
    q: keyword.trim(),
    apiKey: NEWS_API_KEY,
    language: 'en',
    pageSize: pageSize,
    sortBy: 'publishedAt',
    from: sevenDaysAgo.toISOString().split('T')[0],
    to: today.toISOString().split('T')[0]
  })

  return fetch(`${NEWS_API_BASE_URL}?${params}`)
    .then(checkResponse)
    .catch((error) => {
      console.error('Error searching news:', error)
      throw error
    })
}

// Get top headlines by country
export const getTopHeadlines = (country = 'us', pageSize = 20) => {
  const params = new URLSearchParams({
    country: country,
    apiKey: NEWS_API_KEY,
    pageSize: pageSize
  })

  const topHeadlinesUrl = import.meta.env.MODE === 'production'
    ? 'https://nomoreparties.co/news/v2/top-headlines'
    : 'https://newsapi.org/v2/top-headlines'

  return fetch(`${topHeadlinesUrl}?${params}`)
    .then(checkResponse)
    .catch((error) => {
      console.error('Error fetching top headlines:', error)
      throw error
    })
}

// Get news by category
export const getNewsByCategory = (category, country = 'us', pageSize = 20) => {
  const params = new URLSearchParams({
    category: category,
    country: country,
    apiKey: NEWS_API_KEY,
    pageSize: pageSize
  })

  const topHeadlinesUrl = import.meta.env.MODE === 'production'
    ? 'https://nomoreparties.co/news/v2/top-headlines'
    : 'https://newsapi.org/v2/top-headlines'

  return fetch(`${topHeadlinesUrl}?${params}`)
    .then(checkResponse)
    .catch((error) => {
      console.error('Error fetching news by category:', error)
      throw error
    })
}

export default {
  searchNews,
  getTopHeadlines,
  getNewsByCategory
}
