import { gitHubAuthUrl } from './urls'

describe('url utility functions', (): void => {
  describe('#gitHubAuthUrl()', (): void => {
    it('should generate a correct github auth url', (): void => {
      process.env.REACT_APP_GITHUB_CLIENT_ID = '4230faf9g2e23'
      process.env.REACT_APP_BASE_URL = 'https://compendium.com'
      const url = gitHubAuthUrl()
      expect(url).toBe(
        'https://github.com/login/oauth/authorize?client_id=4230faf9g2e23&scope=user repo&redirect_uri=https://compendium.com/login/oauth/callback'
      )
    })
  })
})
