export const mockNewsArticles = [
  {
    id: '1',
    title: 'SpaceX Successfully Launches New Satellite Constellation',
    description: 'SpaceX has successfully launched another batch of satellites into orbit, expanding its global internet coverage network. The launch took place early this morning from Cape Canaveral.',
    url: 'https://example.com/spacex-launch',
    urlToImage: 'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=800',
    publishedAt: '2026-02-03T08:30:00Z',
    source: {
      id: 'tech-news',
      name: 'TechCrunch'
    },
    author: 'Sarah Johnson',
    content: 'SpaceX continues its ambitious expansion of satellite technology...'
  },
  {
    id: '2',
    title: 'Climate Summit Reaches Historic Agreement',
    description: 'World leaders have reached a groundbreaking agreement on climate action at the International Climate Summit. The accord includes commitments to reduce carbon emissions by 50% by 2030.',
    url: 'https://example.com/climate-summit',
    urlToImage: 'https://images.unsplash.com/photo-1569163139394-de4798aa62b6?w=800',
    publishedAt: '2026-02-02T14:20:00Z',
    source: {
      id: 'bbc-news',
      name: 'BBC News'
    },
    author: 'Michael Chen',
    content: 'In a historic moment, representatives from 195 countries...'
  },
  {
    id: '3',
    title: 'Breakthrough in Quantum Computing Announced',
    description: 'Scientists at MIT have announced a major breakthrough in quantum computing, demonstrating a new qubit design that could revolutionize the field and bring quantum computers closer to practical applications.',
    url: 'https://example.com/quantum-computing',
    urlToImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800',
    publishedAt: '2026-02-01T11:45:00Z',
    source: {
      id: 'science-daily',
      name: 'Science Daily'
    },
    author: 'Dr. Emily Rodriguez',
    content: 'The new qubit design overcomes one of the biggest challenges...'
  },
  {
    id: '4',
    title: 'Global Economy Shows Signs of Recovery',
    description: 'Economic indicators suggest a strong recovery in global markets, with major economies posting better-than-expected growth figures for the first quarter of 2026.',
    url: 'https://example.com/economy-recovery',
    urlToImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800',
    publishedAt: '2026-01-31T09:15:00Z',
    source: {
      id: 'financial-times',
      name: 'Financial Times'
    },
    author: 'James Williams',
    content: 'Markets responded positively to the latest economic data...'
  },
  {
    id: '5',
    title: 'New AI Model Achieves Human-Level Performance',
    description: 'Researchers have developed an AI model that matches human performance on complex reasoning tasks, marking a significant milestone in artificial intelligence development.',
    url: 'https://example.com/ai-breakthrough',
    urlToImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
    publishedAt: '2026-01-30T16:00:00Z',
    source: {
      id: 'wired',
      name: 'Wired'
    },
    author: 'Alexandra Kim',
    content: 'The new model demonstrates unprecedented capabilities...'
  },
  {
    id: '6',
    title: 'Major Renewable Energy Project Completed',
    description: 'The world\'s largest offshore wind farm has been completed, providing clean energy to millions of homes and setting a new standard for renewable energy projects.',
    url: 'https://example.com/renewable-energy',
    urlToImage: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800',
    publishedAt: '2026-01-29T10:30:00Z',
    source: {
      id: 'reuters',
      name: 'Reuters'
    },
    author: 'David Martinez',
    content: 'The project spans over 250 square kilometers of ocean...'
  }
]

export const mockSavedArticles = [
  {
    id: '2',
    title: 'Climate Summit Reaches Historic Agreement',
    description: 'World leaders have reached a groundbreaking agreement on climate action at the International Climate Summit. The accord includes commitments to reduce carbon emissions by 50% by 2030.',
    url: 'https://example.com/climate-summit',
    urlToImage: 'https://images.unsplash.com/photo-1569163139394-de4798aa62b6?w=800',
    publishedAt: '2026-02-02T14:20:00Z',
    source: {
      id: 'bbc-news',
      name: 'BBC News'
    },
    author: 'Michael Chen',
    content: 'In a historic moment, representatives from 195 countries...',
    keyword: 'climate'
  },
  {
    id: '3',
    title: 'Breakthrough in Quantum Computing Announced',
    description: 'Scientists at MIT have announced a major breakthrough in quantum computing, demonstrating a new qubit design that could revolutionize the field and bring quantum computers closer to practical applications.',
    url: 'https://example.com/quantum-computing',
    urlToImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800',
    publishedAt: '2026-02-01T11:45:00Z',
    source: {
      id: 'science-daily',
      name: 'Science Daily'
    },
    author: 'Dr. Emily Rodriguez',
    content: 'The new qubit design overcomes one of the biggest challenges...',
    keyword: 'technology'
  }
]

export const formatDate = (dateString) => {
  const date = new Date(dateString)
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return date.toLocaleDateString('en-US', options)
}

export const getRelativeTime = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now - date)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  return formatDate(dateString)
}
