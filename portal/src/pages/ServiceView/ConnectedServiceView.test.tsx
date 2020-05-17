import React from 'react'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'

import { MemoryRouter, Route } from 'react-router'
import { act, create, ReactTestRenderer } from 'react-test-renderer'

import ConnectedServiceView from './ConnectedServiceView'

const mockStore = configureMockStore([])

describe('ConnectedServiceView', (): void => {
  it('should render without any issues', async (): Promise<void> => {
    let wrapper: ReactTestRenderer | null = null
    await act(
      async (): Promise<void> => {
        wrapper = create(
          <MemoryRouter initialEntries={['/view/Service1']}>
            <Provider
              store={mockStore({
                editor: {
                  documentHasChanged: false,
                  spec: '',
                  currentSpecSHA: '',
                  currentCommitDescription: '',
                  isCommitting: false,
                },
                global: { notifications: [], demoMode: false },
              })}
            >
              <Route
                path="/view/:service"
                render={(props: any): React.ReactElement => (
                  // Setting isLoading to true means we don't have to load child components like the sidebar in.
                  <ConnectedServiceView {...props} />
                )}
              />
            </Provider>
          </MemoryRouter>
        )
      }
    )
    expect(
      ((wrapper as unknown) as ReactTestRenderer).root.findAllByType('div')
        .length
    ).toBeGreaterThan(0)
  })
})
