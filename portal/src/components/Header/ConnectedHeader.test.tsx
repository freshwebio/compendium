import React from 'react'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { apiMiddleware } from 'redux-api-middleware'
import nock from 'nock'

import { MemoryRouter } from 'react-router'
import { act, create } from 'react-test-renderer'

import ConnectedHeader from './ConnectedHeader'
import githubApiInjector from 'appredux/middleware/githubApiInjector'
import InlineAddField from 'components/InlineAddField'
import { ADD_GROUP } from 'appredux/actions/entities/types'

const mockStore = configureMockStore([githubApiInjector, apiMiddleware])

describe('ConnectedHeader', (): void => {
  afterEach((): void => {
    nock.cleanAll()
  })

  it('should render without any issues', (): void => {
    const rendered = create(
      <MemoryRouter>
        <Provider
          store={mockStore({
            entities: { isAddingGroup: false, addingServiceStates: {} },
            global: { demoMode: true },
          })}
        >
          <ConnectedHeader />
        </Provider>
      </MemoryRouter>
    )
    expect(rendered.root.findAllByType('div').length).toBeGreaterThan(0)
  })

  it('should dispatch action for adding a group for a logged in user', (): void => {
    nock('https://api.github.com')
      .put((): boolean => true)
      .reply(200, { payload: 'OK!' })

    const store = mockStore({
      entities: { isAddingGroup: false, addingServiceStates: {} },
      global: { demoMode: true },
    })
    const rendered = create(
      <MemoryRouter>
        <Provider store={store}>
          <ConnectedHeader isLoggedIn={true} />
        </Provider>
      </MemoryRouter>
    )

    act((): void => {
      rendered.root.findByType(InlineAddField).props.onSave('test-group-1')
    })

    expect(store.getActions()).toEqual([{ type: ADD_GROUP }])
  })
})
