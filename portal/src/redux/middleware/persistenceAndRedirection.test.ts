import persistenceAndRedirection from './persistenceAndRedirection'
import { TOGGLE_DEMO_MODE } from 'appredux/actions/global/types'
import { saveState } from 'services/stateStorage'

describe('middleware to persist state to local storage and carry out redirects where necessary', (): void => {
  beforeEach(
    (): void => {
      ;(saveState as jest.Mock).mockReset()
    }
  )

  it('should save the state and redirect when the demo mode is toggled off', (): void => {
    window.location.href = 'http://localhost'
    const store = {
      dispatch: jest.fn(),
      getState: jest.fn((): any => ({ global: { demoMode: true } })),
    }
    const next = jest.fn()

    const action = {
      type: TOGGLE_DEMO_MODE,
    }
    persistenceAndRedirection(store)(next)(action)

    expect(next).toHaveBeenCalledWith(action)
    expect(saveState).toHaveBeenCalledWith({ global: { demoMode: false } })
    expect(window.location.href).toEqual('/')
  })

  it('should save the state and redirect when the demo mode is toggled on', (): void => {
    window.location.href = 'http://localhost'
    const store = {
      dispatch: jest.fn(),
      getState: jest.fn((): any => ({ global: { demoMode: false } })),
    }
    const next = jest.fn()

    const action = {
      type: TOGGLE_DEMO_MODE,
    }
    persistenceAndRedirection(store)(next)(action)

    expect(next).toHaveBeenCalledWith(action)
    expect(saveState).toHaveBeenCalledWith({ global: { demoMode: true } })
    expect(window.location.href).toEqual('/')
  })

  it('should do nothing for an action type that is not supported', (): void => {
    const store = {
      dispatch: jest.fn(),
      getState: jest.fn((): any => ({ global: { demoMode: false } })),
    }
    const next = jest.fn()

    const action = {
      type: 'OTHER_ACTION',
    }
    persistenceAndRedirection(store)(next)(action)

    expect(next).toHaveBeenCalledWith(action)
    expect(saveState).toHaveBeenCalledTimes(0)
  })
})
