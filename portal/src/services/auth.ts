import axios from 'axios'

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const getAccessToken = async (code: string): Promise<string> => {
  const response = await api.post('/auth/github/oauth/access-token', { code })
  const { token } = response.data
  return token
}

export const isLoggedIn = async (demoMode?: boolean): Promise<boolean> => {
  // Users will only be able to access dummy services in demo mode
  // that will be mocked out at the "service" module and redux middleware layers.
  if (process.env.REACT_APP_DEMO_MODE && demoMode) {
    return true
  }

  let token
  try {
    token = sessionStorage.getItem(
      process.env.REACT_APP_TOKEN_NAME || 'apydox-token'
    )
  } catch (err) {
    return false
  }

  try {
    const response = await api.get('/auth/github/check', { params: { token } })
    const { validToken } = response.data
    return validToken
  } catch (err) {
    return false
  }
}

export const logout = async (demoMode?: boolean): Promise<boolean> => {
  // If the user is in demo mode, logout should do nothing but redirect them to the dashboard.
  if (process.env.REACT_APP_DEMO_MODE && demoMode) {
    return true
  }

  let token
  try {
    const tokenName = process.env.REACT_APP_TOKEN_NAME || 'apydox-token'
    token = sessionStorage.getItem(tokenName)
    sessionStorage.removeItem(tokenName)
  } catch (err) {
    return false
  }

  try {
    const response = await api.delete(`/auth/github/revoke/${token}`)
    return response.data
  } catch (err) {
    return false
  }
}
