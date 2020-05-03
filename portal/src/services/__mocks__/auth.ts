export const getAccessToken = async (code: string): Promise<string> => {
  if (code.includes('fail')) {
    throw new Error('Failed to retrieve access token')
  }
  return 'accesscode'
}

export const logout = async (): Promise<boolean> => {
  return true
}

export const isLoggedIn = async (): Promise<boolean> => {
  return true
}
