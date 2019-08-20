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
    window.location.href = '/'
    await act(
      async (): Promise<void> => {
        create(
          <Provider
            store={mockStore({
              entities: { isAddingGroup: false, addingServiceStates: {} },
              global: { demoMode: true },
            })}
          >
            <MemoryRouter initialEntries={['/']}>
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

  it('should render the login callback view without any issues', async (): Promise<
    void
  > => {
    window.location.href = '/login/oauth/callback?code=DrewqqeoeWQ'
    await act(
      async (): Promise<void> => {
        create(
          <MemoryRouter
            initialEntries={['/login/oauth/callback?code=DrewqqeoeWQ']}
          >
            <Routes
              loadingAndAccess={{ isLoggedIn: false, isLoading: true }}
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
    window.location.href = '/edit/Service32'
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
              global: { notifications: [], demoMode: true },
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
