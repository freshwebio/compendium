import { sanitiseStringAlphaNumeric } from './sanitisation'

describe('User input sanitisation', (): void => {
  describe('#sanitiseStringAlphaNumeric()', (): void => {
    it('should strip out all the characters that are not word characters or spaces', (): void => {
      expect(
        sanitiseStringAlphaNumeric(
          '<script>alert(0)</script>;DELETE * FROM users'
        )
      ).toBe('scriptalert0scriptDELETE  FROM users')
    })
  })
})
