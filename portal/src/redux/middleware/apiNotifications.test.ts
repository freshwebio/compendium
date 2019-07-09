import apiNotifications from './apiNotifications'
import {
  COMMIT_CHANGES_SUCCESS,
  COMMIT_CHANGES_FAILURE,
} from 'appredux/actions/editor/types'
import {
  ADD_GROUP_SUCCESS,
  ADD_GROUP_FAILURE,
  ADD_SERVICE_SUCCESS,
  ADD_SERVICE_FAILURE,
} from 'appredux/actions/entities/types'

describe('apiNotifications', (): void => {
  it('should not do anything when the provided action is not a result of a request to commit changes', (): void => {
    const action = {
      type: 'CUSTOM_TEST_ACTION',
      value: 'A custom action value',
    }
    const next = jest.fn()
    const store = { dispatch: jest.fn(), getState: jest.fn() }
    apiNotifications(store)(next)(action)
    expect(next).toHaveBeenCalledWith({
      type: 'CUSTOM_TEST_ACTION',
      value: 'A custom action value',
    })
  })

  it('should add a success notification for a successful request to commit changes', (): void => {
    const action = {
      type: COMMIT_CHANGES_SUCCESS,
      payload: { result: { content: 'This is some test content' } },
    }
    const next = jest.fn()
    const store = { dispatch: jest.fn(), getState: jest.fn() }
    apiNotifications(store)(next)(action)
    expect(next).toHaveBeenCalledWith({
      type: COMMIT_CHANGES_SUCCESS,
      payload: { result: { content: 'This is some test content' } },
    })
    const dispatchMockCall = store.dispatch.mock.calls[0][0]
    expect(dispatchMockCall.id.length).toBeGreaterThanOrEqual(32) // UUID should be of length greater than 32.
    expect(dispatchMockCall.message).toBe('Changes committed')
    expect(dispatchMockCall.notificationType).toBe('success')
  })

  it('should add a failure notification for a failed attempt to commit changes', (): void => {
    const action = {
      type: COMMIT_CHANGES_FAILURE,
      payload: { result: { message: 'An error' } },
    }
    const next = jest.fn()
    const store = { dispatch: jest.fn(), getState: jest.fn() }
    apiNotifications(store)(next)(action)
    expect(next).toHaveBeenCalledWith({
      type: COMMIT_CHANGES_FAILURE,
      payload: { result: { message: 'An error' } },
    })
    const dispatchMockCall = store.dispatch.mock.calls[0][0]
    expect(dispatchMockCall.id.length).toBeGreaterThanOrEqual(32) // UUID should be of length greater than 32.
    expect(dispatchMockCall.message).toBe('Changes not committed, try again')
    expect(dispatchMockCall.notificationType).toBe('error')
  })

  it('should add a success notification for a successful request to add a group', (): void => {
    const action = {
      type: ADD_GROUP_SUCCESS,
      payload: { result: { content: 'This is some test content' } },
    }
    const next = jest.fn()
    const store = { dispatch: jest.fn(), getState: jest.fn() }
    apiNotifications(store)(next)(action)
    expect(next).toHaveBeenCalledWith({
      type: ADD_GROUP_SUCCESS,
      payload: { result: { content: 'This is some test content' } },
    })
    const dispatchMockCall = store.dispatch.mock.calls[0][0]
    expect(dispatchMockCall.id.length).toBeGreaterThanOrEqual(32) // UUID should be of length greater than 32.
    expect(dispatchMockCall.message).toBe('Service group created')
    expect(dispatchMockCall.notificationType).toBe('success')
  })

  it('should add a failure notification for a failed attempt to add a group', (): void => {
    const action = {
      type: ADD_GROUP_FAILURE,
      payload: { result: { message: 'An error' } },
    }
    const next = jest.fn()
    const store = { dispatch: jest.fn(), getState: jest.fn() }
    apiNotifications(store)(next)(action)
    expect(next).toHaveBeenCalledWith({
      type: ADD_GROUP_FAILURE,
      payload: { result: { message: 'An error' } },
    })
    const dispatchMockCall = store.dispatch.mock.calls[0][0]
    expect(dispatchMockCall.id.length).toBeGreaterThanOrEqual(32) // UUID should be of length greater than 32.
    expect(dispatchMockCall.message).toBe('Failed to create a new group')
    expect(dispatchMockCall.notificationType).toBe('error')
  })

  it('should add a success notification for a successful request to add a service definition', (): void => {
    const action = {
      type: ADD_SERVICE_SUCCESS,
      payload: { result: { content: 'This is some test content' } },
    }
    const next = jest.fn()
    const store = { dispatch: jest.fn(), getState: jest.fn() }
    apiNotifications(store)(next)(action)
    expect(next).toHaveBeenCalledWith({
      type: ADD_SERVICE_SUCCESS,
      payload: { result: { content: 'This is some test content' } },
    })
    const dispatchMockCall = store.dispatch.mock.calls[0][0]
    expect(dispatchMockCall.id.length).toBeGreaterThanOrEqual(32) // UUID should be of length greater than 32.
    expect(dispatchMockCall.message).toBe('Service definition created')
    expect(dispatchMockCall.notificationType).toBe('success')
  })

  it('should add a failure notification for a failed attempt to add a service definition', (): void => {
    const action = {
      type: ADD_SERVICE_FAILURE,
      payload: { result: { message: 'An error' } },
    }
    const next = jest.fn()
    const store = { dispatch: jest.fn(), getState: jest.fn() }
    apiNotifications(store)(next)(action)
    expect(next).toHaveBeenCalledWith({
      type: ADD_SERVICE_FAILURE,
      payload: { result: { message: 'An error' } },
    })
    const dispatchMockCall = store.dispatch.mock.calls[0][0]
    expect(dispatchMockCall.id.length).toBeGreaterThanOrEqual(32) // UUID should be of length greater than 32.
    expect(dispatchMockCall.message).toBe(
      'Failed to create a new service definition'
    )
    expect(dispatchMockCall.notificationType).toBe('error')
  })
})
