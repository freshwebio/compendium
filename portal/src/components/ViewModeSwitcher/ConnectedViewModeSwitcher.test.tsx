import React from 'react'
import { create } from 'react-test-renderer'
import { MemoryRouter } from 'react-router'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import { Link } from 'react-router-dom'

import ConnectedViewModeSwitcher from './ConnectedViewModeSwitcher'

const mockStore = configureMockStore([])

describe('ConnectedViewModeSwitcher', (): void => {
  it('should render without any issues', (): void => {
    const renderer = create(
      <MemoryRouter>
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
          <ConnectedViewModeSwitcher
            viewMatch={{
              params: { service: 'Service1' },
              isExact: false,
              path: '/view/Service1',
              url: '/view/Service1',
            }}
            editorMatch={null}
            isLoggedIn={true}
          />
        </Provider>
      </MemoryRouter>
    )
    expect(renderer.root.findAllByType(Link).length).toBeGreaterThan(0)
  })
})
