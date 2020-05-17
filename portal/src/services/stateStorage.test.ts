import { loadState, saveState } from './stateStorage'

describe('state storage', (): void => {
  describe('#loadState()', (): void => {
    beforeEach((): void => {
      localStorage.clear()
    })

    it('should load the persisted portion of state from local storage', (): void => {
      localStorage.setItem('apydoxState', '{"global":{"demoMode":true}}')
      expect(loadState()).toEqual({ global: { demoMode: true } })
    })

    it('should fail to load the persisted portion of state if it is not valid JSON and return undefined', (): void => {
      localStorage.setItem('apydoxState', '{"global":{"demoMode":true')
      expect(loadState()).toBeUndefined()
    })

    it('should fail to load the persistred portion of state if it is not set and return undefined', (): void => {
      expect(loadState()).toBeUndefined()
    })
  })

  describe('#saveState()', (): void => {
    it('should successfully save the provided portion of state to local storage', (): void => {
      saveState({ global: { demoMode: true } })
      expect(localStorage.getItem('apydoxState')).toEqual(
        '{"global":{"demoMode":true}}'
      )
    })
  })
})
