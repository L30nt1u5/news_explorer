const NEWS_API_KEY = '19a885fb295a4cc38b4fba749c79146b'

const NEWS_API_BASE_URL = import.meta.env.MODE === 'production'
  ? 'https://nomoreparties.co/news/v2/everything'
  : 'https://newsapi.org/v2/everything'

const checkResponse = (res) => {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Error: ${res.status}`)
}

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
      throw error
    })
}

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
      throw error
    })
}

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
      throw error
    })
}

export default {
  searchNews,
  getTopHeadlines,
  getNewsByCategory
}
