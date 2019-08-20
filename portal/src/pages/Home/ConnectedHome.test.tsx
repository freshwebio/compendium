import React from 'react'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'

import { MemoryRouter, Route } from 'react-router'
import { act, create, ReactTestRenderer } from 'react-test-renderer'

import ConnectedHome from './ConnectedHome'

const mockStore = configureMockStore([])

describe('ConnectedHome', (): void => {
  it('should render without any issues', async (): Promise<void> => {
    let wrapper: ReactTestRenderer
    await act(
      async (): Promise<void> => {
        wrapper = create(
          <MemoryRouter initialEntries={['/edit/Service1']}>
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
              <Route
                path="/"
                render={(props: any): React.ReactElement => (
                  // Setting isLoading to true means we don't have to load child components like the sidebar in.
                  <ConnectedHome
                    isLoggedIn={false}
                    isLoading={true}
                    {...props}
                  />
                )}
              />
            </Provider>
          </MemoryRouter>
        )
      }
    )
    expect(wrapper.root.findAllByType('div').length).toBeGreaterThan(0)
  })
})
