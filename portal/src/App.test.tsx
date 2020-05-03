import React from 'react'
import { create, act, ReactTestRenderer } from 'react-test-renderer'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'

import StandaloneHeader from 'components/Header/Header'
import App from './App'
import { ButtonLink } from 'components/Header/header.styles'
import { TOGGLE_DEMO_MODE } from 'appredux/actions/global/types'

jest.mock('services/github')
jest.mock('services/auth')
jest.mock('services/stateStorage')

const mockStore = configureMockStore([])

describe('App', (): void => {
  beforeEach((): void => {
    window.location.href = 'http://localhost/'
  })

  it('renders without crashing', async (): Promise<void> => {
    await act(
      async (): Promise<void> => {
        create(
          <Provider
            store={mockStore({
              editor: {
                documentHasChanged: false,
                spec: '',
                currentSpecSHA: '',
                currentCommitDescription: '',
                isCommitting: false,
              },
              global: { notifications: [] },
              entities: { isAddingGroup: false, addingServiceStates: {} },
            })}
          >
            <App />
          </Provider>
        )
      }
    )
  })

  it('logs the user out when they click the logout button in the header', async (): Promise<
    void
  > => {
    let rendered: ReactTestRenderer
    await act(
      async (): Promise<void> => {
        rendered = create(
          <Provider
            store={mockStore({
              editor: {
                documentHasChanged: false,
                spec: '',
                currentSpecSHA: '',
                currentCommitDescription: '',
                isCommitting: false,
              },
              global: { notifications: [] },
              entities: { isAddingGroup: false, addingServiceStates: {} },
            })}
          >
            <App />
          </Provider>
        )
      }
    )

    const header = rendered.root.findByType(StandaloneHeader)
    const logoutButton = header.findByType(ButtonLink)

    expect(window.location.href).toBe('http://localhost/')
    await act(
      async (): Promise<void> => {
        logoutButton.props.onClick()
      }
    )

    expect(window.location.href).toBe('/')
  })

  it('should trigger the toggle demo mode action when logout is clicked (which will go on to redirect the user)', async (): Promise<
    void
  > => {
    const mockStoreInstance = mockStore({
      editor: {
        documentHasChanged: false,
        spec: '',
        currentSpecSHA: '',
        currentCommitDescription: '',
        isCommitting: false,
      },
      global: { notifications: [], demoMode: true },
      entities: { isAddingGroup: false, addingServiceStates: {} },
    })

    let rendered: ReactTestRenderer
    await act(
      async (): Promise<void> => {
        rendered = create(
          <Provider store={mockStoreInstance}>
            <App />
          </Provider>
        )
      }
    )

    const header = rendered.root.findByType(StandaloneHeader)
    const logoutButton = header.findByType(ButtonLink)

    expect(window.location.href).toBe('http://localhost/')
    await act(
      async (): Promise<void> => {
        logoutButton.props.onClick()
      }
    )

    expect(mockStoreInstance.getActions()).toEqual([{ type: TOGGLE_DEMO_MODE }])
  })
})
