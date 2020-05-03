import React from 'react'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { apiMiddleware } from 'redux-api-middleware'
import nock from 'nock'

import { MemoryRouter } from 'react-router'
import { act, create } from 'react-test-renderer'
import { ThemeProvider } from 'styled-components'

import theme from 'styles/themes/apydoxv1'
import ConnectedApiDefGroup from './ConnectedApiDefGroup'
import StandaloneApiDefGroup from './ApiDefGroup'
import githubApiInjector from 'appredux/middleware/githubApiInjector'
import InlineAddField from 'components/InlineAddField'
import { ADD_SERVICE } from 'appredux/actions/entities/types'

const mockStore = configureMockStore([githubApiInjector, apiMiddleware])

describe('ConnectedApiDefGroup', (): void => {
  afterEach((): void => {
    nock.cleanAll()
  })

  it('should render without any issues and expose entities to the ApiDefGroup', (): void => {
    const store = mockStore({
      entities: { isAddingGroup: false, addingServiceStates: {} },
    })
    const rendered = create(
      <MemoryRouter>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <ConnectedApiDefGroup definitions={[]} groupId="test-group-1" />
          </ThemeProvider>
        </Provider>
      </MemoryRouter>
    )
    expect(rendered.root.findAllByType('div').length).toBeGreaterThan(0)
    expect(
      rendered.root.findByType(StandaloneApiDefGroup).props.entities
    ).toEqual({
      isAddingGroup: false,
      addingServiceStates: {},
    })
  })

  it('should dispatch action for adding a service to a group', (): void => {
    nock('https://api.github.com')
      .put((): boolean => true)
      .reply(200, { payload: 'OK!' })

    const store = mockStore({
      entities: { isAddingGroup: false, addingServiceStates: {} },
    })
    const rendered = create(
      <MemoryRouter>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <ConnectedApiDefGroup definitions={[]} groupId="test-group-1" />
          </ThemeProvider>
        </Provider>
      </MemoryRouter>
    )

    act((): void => {
      rendered.root.findByType(InlineAddField).props.onSave('test-service-1')
    })

    expect(store.getActions()).toEqual([
      { meta: { groupId: 'test-group-1' }, type: ADD_SERVICE },
    ])
  })
})
