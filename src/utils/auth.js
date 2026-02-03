// auth.js - Simulated authentication responses

// Simulate storing user data in localStorage
const STORAGE_KEY = 'newsExplorerUser'
const TOKEN_KEY = 'newsExplorerToken'

// Generate a fake token
const generateFakeToken = () => {
  return 'fake_token_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now()
}

// Simulate user registration
export const authorize = (email, password, username) => {
  return new Promise((resolve, reject) => {
    // Simulate network delay
    setTimeout(() => {
      // Simulate basic validation
      if (!email || !password || !username) {
        reject({ message: 'Missing required fields' })
        return
      }

      if (password.length < 6) {
        reject({ message: 'Password must be at least 6 characters' })
        return
      }

      // Generate fake token and user data
      const token = generateFakeToken()
      const user = {
        _id: 'user_' + Math.random().toString(36).substr(2, 9),
        email: email,
        username: username
      }

      // Store in localStorage
      localStorage.setItem(TOKEN_KEY, token)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user))

      resolve({
        token: token,
        user: user
      })
    }, 1000)
  })
}

// Simulate user login
export const login = (email, password) => {
  return new Promise((resolve, reject) => {
    // Simulate network delay
    setTimeout(() => {
      // Simulate basic validation
      if (!email || !password) {
        reject({ message: 'Email and password are required' })
        return
      }

      // Check if user exists (mock check)
      const existingUser = localStorage.getItem(STORAGE_KEY)
      if (!existingUser) {
        reject({ message: 'Invalid email or password' })
        return
      }

      const user = JSON.parse(existingUser)

      // In a real app, we'd verify the password
      // For now, just check if email matches
      if (user.email !== email) {
        reject({ message: 'Invalid email or password' })
        return
      }

      // Generate fake token
      const token = generateFakeToken()

      // Store token
      localStorage.setItem(TOKEN_KEY, token)

      resolve({
        token: token,
        user: user
      })
    }, 1000)
  })
}

// Simulate checking if token is valid
export const checkToken = (token) => {
  return new Promise((resolve, reject) => {
    // Simulate network delay
    setTimeout(() => {
      if (!token) {
        reject({ message: 'No token provided' })
        return
      }

      // Get user from localStorage
      const userStr = localStorage.getItem(STORAGE_KEY)

      if (!userStr) {
        reject({ message: 'User not found' })
        return
      }

      const user = JSON.parse(userStr)

      resolve({
        data: user
      })
    }, 500)
  })
}

// Simulate logout
export const logout = () => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(STORAGE_KEY)
      resolve({ message: 'Logged out successfully' })
    }, 500)
  })
}

// Get stored token
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY)
}

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!localStorage.getItem(TOKEN_KEY)
}

export default {
  authorize,
  login,
  checkToken,
  logout,
  getToken,
  isAuthenticated
}
