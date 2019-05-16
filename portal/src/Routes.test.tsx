import React from 'react'
import { MemoryRouter } from 'react-router'
import { act, create } from 'react-test-renderer'
import Routes from './Routes'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'

const mockStore = configureMockStore([])

describe('Routes', (): void => {
  it('should render the dashboard view without any issues', async (): Promise<
    void
  > => {
    await act(
      async (): Promise<void> => {
        create(
          <MemoryRouter initialEntries={['/']}>
            <Routes
              loadingAndAccess={{ isLoggedIn: true, isLoading: false }}
              setLoadingAndAccess={jest.fn()}
            />
          </MemoryRouter>
        )
      }
    )
  })

  it('should render the login callback view without any issues', async (): Promise<
    void
  > => {
    await act(
      async (): Promise<void> => {
        create(
          <MemoryRouter initialEntries={['/login/oauth/callback']}>
            <Routes
              loadingAndAccess={{ isLoggedIn: true, isLoading: false }}
              setLoadingAndAccess={jest.fn()}
            />
          </MemoryRouter>
        )
      }
    )
  })

  it('should render the editor view without any issues', async (): Promise<
    void
  > => {
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
            <MemoryRouter initialEntries={['/edit/Service32']}>
              <Routes
                loadingAndAccess={{ isLoggedIn: true, isLoading: false }}
                setLoadingAndAccess={jest.fn()}
              />
            </MemoryRouter>
          </Provider>
        )
      }
    )
  })
})
