export const gitHubAuthUrl = (): string => {
  const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID
  const redirectUri = `${process.env.REACT_APP_BASE_URL}/login/oauth/callback`
  return `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user repo&redirect_uri=${redirectUri}`
}
