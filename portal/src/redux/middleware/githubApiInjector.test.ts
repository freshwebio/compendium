import githubApiInjector from './githubApiInjector'
import { RSAA } from 'redux-api-middleware'
import {
  COMMIT_CHANGES,
  COMMIT_CHANGES_SUCCESS,
  COMMIT_CHANGES_FAILURE,
} from 'appredux/actions/editor/types'

describe('githubApiInjector middleware', (): void => {
  it('should not modify an action that is not an RSAA', (): void => {
    const action = {
      type: 'CUSTOM_TEST_ACTION',
      value: 'A custom action value',
    }
    const next = jest.fn()
    const store = { dispatch: jest.fn(), getState: jest.fn() }
    githubApiInjector(store)(next)(action)
    expect(next).toHaveBeenCalledWith({
      type: 'CUSTOM_TEST_ACTION',
      value: 'A custom action value',
    })
  })

  it('should not modify an action that is an api RSAA action but is not a github api call', (): void => {
    const action = {
      [RSAA]: {
        endpoint: 'https://api.example.com',
        headers: { 'Content-Type': 'application/json' },
        types: ['CUSTOM_REQUEST', 'CUSTOM_SUCCESS', 'CUSTOM_FAILURE'],
      },
    }
    const next = jest.fn()
    const store = { dispatch: jest.fn(), getState: jest.fn() }
    githubApiInjector(store)(next)(action)
    expect(next).toHaveBeenCalledWith({
      [RSAA]: {
        endpoint: 'https://api.example.com',
        headers: {
          'Content-Type': 'application/json',
        },
        types: ['CUSTOM_REQUEST', 'CUSTOM_SUCCESS', 'CUSTOM_FAILURE'],
      },
    })
  })

  it('should modify a github api RSAA action with the correct endpoint and authorization header', (): void => {
    process.env.REACT_APP_API_DOCS_REPO_OWNER = 'freshwebio'
    process.env.REACT_APP_API_DOCS_REPO = 'test-content'
    process.env.REACT_APP_TOKEN_NAME = 'apydox-test-token'
    sessionStorage.setItem('apydox-test-token', 'fsdfg0321ds')
    const action = {
      [RSAA]: {
        endpoint: '/content/core-services/Service1.yaml',
        headers: { 'Content-Type': 'application/json' },
        types: [
          { type: COMMIT_CHANGES },
          COMMIT_CHANGES_SUCCESS,
          COMMIT_CHANGES_FAILURE,
        ],
      },
    }
    const next = jest.fn()
    const store = { dispatch: jest.fn(), getState: jest.fn() }
    githubApiInjector(store)(next)(action)
    expect(next).toHaveBeenCalledWith({
      [RSAA]: {
        endpoint:
          'https://api.github.com/repos/freshwebio/test-content/content/core-services/Service1.yaml',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer fsdfg0321ds',
        },
        types: [
          { type: COMMIT_CHANGES },
          COMMIT_CHANGES_SUCCESS,
          COMMIT_CHANGES_FAILURE,
        ],
      },
    })
  })
})
