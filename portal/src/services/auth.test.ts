import nock from 'nock'
import { getAccessToken, isLoggedIn, logout } from './auth'

describe('api auth endpoints', (): void => {
  describe('#getAccessToken()', (): void => {
    it('should produce an access token', async (): Promise<void> => {
      nock('https://api.apydox.com')
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .post('/auth/github/oauth/access-token', { code: 'fsdfi303d9adasd' })
        .reply(200, { token: 'Fasd1230casd9Qeow92' })
        .options('/auth/github/oauth/access-token')
        .reply(200)

      const token = await getAccessToken('fsdfi303d9adasd')
      expect(token).toBe('Fasd1230casd9Qeow92')
    })
  })

  describe('#isLoggedIn()', (): void => {
    it('should tell us whether or not a user has logged in based on a token in sesion storage', async (): Promise<
      void
    > => {
      nock('https://api.apydox.com')
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .post('/auth/github/check', { access_token: '4230vsdfasdfsdf' })
        .reply(200, { validToken: true })
        .options('/auth/github/check')
        .reply(200)

      sessionStorage.setItem('apydox-token', '4230vsdfasdfsdf')
      const isValid = await isLoggedIn()
      expect(isValid).toBeTrue()
    })

    it('should tell us the user is not logged in the case of an error', async (): Promise<
      void
    > => {
      nock('https://api.apydox.com')
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .post('/auth/github/check', { access_token: '4230vsdfasdfsdf' })
        .reply(400, { message: 'Bad request' })
        .options('/auth/github/check')
        .reply(200)

      sessionStorage.setItem('apydox-token', '4230vsdfasdfsdf')
      const isValid = await isLoggedIn()
      expect(isValid).toBeFalse()
    })

    it('should tell us the user is logged in when in demo mode', async (): Promise<
      void
    > => {
      process.env.REACT_APP_DEMO_MODE = 'true'
      const isValid = await isLoggedIn(true)
      expect(isValid).toBeTrue()
      delete process.env.REACT_APP_DEMO_MODE
    })
  })

  describe('#logout()', (): void => {
    it('should revoke the access token and remove the token from session storage', async (): Promise<
      void
    > => {
      nock('https://api.apydox.com')
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .delete('/auth/github/revoke', { access_token: '4230vsdfasdfsdf' })
        .reply(200, { message: 'token revoked' })
        .options('/auth/github/revoke')
        .reply(200)

      sessionStorage.setItem('apydox-token', '4230vsdfasdfsdf')
      const response = await logout()
      expect(response).toEqual({ message: 'token revoked' })
    })

    it("should report failure when there was an error in attempting to revoke the user's access token", async (): Promise<
      void
    > => {
      nock('https://api.apydox.com')
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .delete('/auth/github/revoke', { access_token: '4230vsdfasdfsdf' })
        .reply(400, { message: 'Bad request' })
        .options('/auth/github/revoke')
        .reply(200)

      sessionStorage.setItem('apydox-token', '4230vsdfasdfsdf')
      const response = await logout()
      expect(response).toBeFalse()
    })

    it('should do nothing and return true when the user is in demo mode', async (): Promise<
      void
    > => {
      process.env.REACT_APP_DEMO_MODE = 'true'
      const response = await logout(true)
      expect(response).toBeTrue()
      delete process.env.REACT_APP_DEMO_MODE
    })
  })
})
