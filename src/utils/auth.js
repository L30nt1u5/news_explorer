const STORAGE_KEY = 'newsExplorerUser'
const TOKEN_KEY = 'newsExplorerToken'

const generateFakeToken = () => {
  return 'fake_token_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now()
}

export const authorize = (email, password, username) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!email || !password || !username) {
        reject({ message: 'Missing required fields' })
        return
      }

      if (password.length < 6) {
        reject({ message: 'Password must be at least 6 characters' })
        return
      }

      const token = generateFakeToken()
      const user = {
        _id: 'user_' + Math.random().toString(36).substr(2, 9),
        email: email,
        username: username
      }

      localStorage.setItem(TOKEN_KEY, token)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user))

      resolve({
        token: token,
        user: user
      })
    }, 1000)
  })
}

export const login = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!email || !password) {
        reject({ message: 'Email and password are required' })
        return
      }

      const existingUser = localStorage.getItem(STORAGE_KEY)
      if (!existingUser) {
        reject({ message: 'Invalid email or password' })
        return
      }

      const user = JSON.parse(existingUser)

      if (user.email !== email) {
        reject({ message: 'Invalid email or password' })
        return
      }

      const token = generateFakeToken()

      localStorage.setItem(TOKEN_KEY, token)

      resolve({
        token: token,
        user: user
      })
    }, 1000)
  })
}

export const checkToken = (token) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!token) {
        reject({ message: 'No token provided' })
        return
      }

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

export const logout = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(STORAGE_KEY)
      resolve({ message: 'Logged out successfully' })
    }, 500)
  })
}

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY)
}

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
