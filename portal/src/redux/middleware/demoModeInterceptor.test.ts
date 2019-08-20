import demoModeInterceptor from './demoModeInterceptor'
import {
  COMMIT_CHANGES_SUCCESS,
  COMMIT_CHANGES_FAILURE,
  COMMIT_CHANGES,
} from 'appredux/actions/editor/types'
import {
  ADD_SERVICE_SUCCESS,
  ADD_SERVICE_FAILURE,
  ADD_SERVICE,
} from 'appredux/actions/entities/types'
import { commitChanges } from 'appredux/actions/editor'
import defaultSpec from 'utils/defaultSpec'
import { addService } from 'appredux/actions/entities'
import { delay } from 'q'

describe('demo mode interceptor middleware', (): void => {
  beforeEach(
    (): void => {
      localStorage.setItem.mockClear()
    }
  )

  it('should save to local storage and dispatch a successful request when demo mode is turned on', async (): Promise<
    void
  > => {
    const action = commitChanges(
      'group1/service1.yaml',
      'This is a commit',
      defaultSpec,
      'asdasdtestdummysha'
    )
    const next = jest.fn()
    const store = {
      dispatch: jest.fn(),
      getState: jest.fn((): any => ({ global: { demoMode: true } })),
    }
    demoModeInterceptor(store)(next)(action)
    await delay(600)
    expect(localStorage.setItem).toHaveBeenCalledWith(
      '/contents/group1/service1.yaml',
      JSON.stringify({
        message: 'This is a commit',
        content: btoa(defaultSpec),
        sha: 'asdasdtestdummysha',
      })
    )
    expect(store.dispatch.mock.calls).toEqual([
      [
        {
          type: COMMIT_CHANGES,
        },
      ],
      [
        {
          payload: {
            content: { sha: 'dummy3g0sdg92rfqsaf' },
          },
          type: COMMIT_CHANGES_SUCCESS,
        },
      ],
    ])
    expect(next).toHaveBeenCalledTimes(0)
  })

  it('should save to local storage and dispatch a successful request with extra metadata when demo mode is turned on', async (): Promise<
    void
  > => {
    const action = addService('group1', 'Configuration Service')
    const next = jest.fn()
    const store = {
      dispatch: jest.fn(),
      getState: jest.fn((): any => ({ global: { demoMode: true } })),
    }
    demoModeInterceptor(store)(next)(action)
    await delay(600)
    expect(localStorage.setItem).toHaveBeenCalledWith(
      '/contents/group1/Configuration-Service.yaml',
      JSON.stringify({
        message: 'Added API definition for the Configuration Service in group1',
        content: btoa(defaultSpec),
      })
    )
    expect(store.dispatch.mock.calls).toEqual([
      [
        {
          type: ADD_SERVICE,
          meta: { groupId: 'group1' },
        },
      ],
      [
        {
          meta: { groupId: 'group1' },
          payload: {
            content: { sha: 'dummy3g0sdg92rfqsaf' },
          },
          type: ADD_SERVICE_SUCCESS,
        },
      ],
    ])
    expect(next).toHaveBeenCalledTimes(0)
  })

  it('should dispatch a request failure action when there is a failure in saving to local storage when demo mode is turned on', async (): Promise<
    void
  > => {
    localStorage.setItem.mockImplementationOnce(
      (): void => {
        throw new Error('Something went wrong with saving data')
      }
    )

    const action = commitChanges(
      'group2/service34.yaml',
      'This is another commit',
      defaultSpec,
      'asdasdtestdummysha'
    )
    const next = jest.fn()
    const store = {
      dispatch: jest.fn(),
      getState: jest.fn((): any => ({ global: { demoMode: true } })),
    }
    demoModeInterceptor(store)(next)(action)
    await delay(600)
    expect(localStorage.setItem).toHaveBeenCalledWith(
      '/contents/group2/service34.yaml',
      JSON.stringify({
        message: 'This is another commit',
        content: btoa(defaultSpec),
        sha: 'asdasdtestdummysha',
      })
    )
    expect(store.dispatch.mock.calls).toEqual([
      [
        {
          type: COMMIT_CHANGES,
        },
      ],
      [
        {
          payload: new Error('Something went wrong with saving data'),
          error: true,
          type: COMMIT_CHANGES_FAILURE,
        },
      ],
    ])
    expect(next).toHaveBeenCalledTimes(0)
  })

  it(
    'should dispatch a request failure action with extra metadata when there is a ' +
      'failure in saving to local storage when demo mode is turned on',
    async (): Promise<void> => {
      localStorage.setItem.mockImplementationOnce(
        (): void => {
          throw new Error('Something went wrong with saving data')
        }
      )

      const action = addService('group23', 'Accounts Service')
      const next = jest.fn()
      const store = {
        dispatch: jest.fn(),
        getState: jest.fn((): any => ({ global: { demoMode: true } })),
      }
      demoModeInterceptor(store)(next)(action)
      await delay(600)
      expect(localStorage.setItem).toHaveBeenCalledWith(
        '/contents/group23/Accounts-Service.yaml',
        JSON.stringify({
          message: 'Added API definition for the Accounts Service in group23',
          content: btoa(defaultSpec),
        })
      )
      expect(store.dispatch.mock.calls).toEqual([
        [
          {
            type: ADD_SERVICE,
            meta: { groupId: 'group23' },
          },
        ],
        [
          {
            meta: { groupId: 'group23' },
            payload: new Error('Something went wrong with saving data'),
            error: true,
            type: ADD_SERVICE_FAILURE,
          },
        ],
      ])
      expect(next).toHaveBeenCalledTimes(0)
    }
  )

  it('should not do anything when demo mode is turned off', async (): Promise<
    void
  > => {
    const action = addService('group23', 'Accounts Service')
    const next = jest.fn()
    const store = {
      dispatch: jest.fn(),
      getState: jest.fn((): any => ({ global: { demoMode: false } })),
    }
    demoModeInterceptor(store)(next)(action)
    await delay(600)
    expect(localStorage.setItem).toHaveBeenCalledTimes(0)
    expect(store.dispatch).toHaveBeenCalledTimes(0)
    expect(next).toHaveBeenCalledTimes(1)
  })

  it('should not do anything for an action that is not a supported api rsaa action that persists data', async (): Promise<
    void
  > => {
    const action = { type: 'SOME_OTHER_ACTION' }
    const next = jest.fn()
    const store = {
      dispatch: jest.fn(),
      getState: jest.fn((): any => ({ global: { demoMode: true } })),
    }
    demoModeInterceptor(store)(next)(action)
    await delay(600)
    expect(localStorage.setItem).toHaveBeenCalledTimes(0)
    expect(store.dispatch).toHaveBeenCalledTimes(0)
    expect(next).toHaveBeenCalledTimes(1)
  })
})
