import React from 'react'
import { create, act, ReactTestRenderer } from 'react-test-renderer'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'

import Header from 'components/Header'
import App from './App'
import { ButtonLink } from 'components/Header/header.styles'

const mockStore = configureMockStore([])

describe('App', (): void => {
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
            })}
          >
            <App />
          </Provider>
        )
      }
    )

    const header = rendered.root.findByType(Header)
    const logoutButton = header.findByType(ButtonLink)

    expect(window.location.href).toBe('http://localhost/')
    await act(
      async (): Promise<void> => {
        logoutButton.props.onClick()
      }
    )

    expect(window.location.href).toBe('/')
  })
})
