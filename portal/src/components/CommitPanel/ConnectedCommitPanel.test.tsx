import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { apiMiddleware } from 'redux-api-middleware'
import nock from 'nock'
import { enzymeFind } from 'styled-components/test-utils'

import { MemoryRouter } from 'react-router'
import { act } from 'react-test-renderer'

import ConnectedCommitPanel from './ConnectedCommitPanel'
import githubApiInjector from 'appredux/middleware/githubApiInjector'
import {
  COMMIT_CHANGES,
  SET_CURRENT_COMMIT_DESCRIPTION,
} from 'appredux/actions/editor/types'
import {
  CommitViewButton,
  CommitViewTextArea,
} from 'components/CommitView/commitView.styles'

const mockStore = configureMockStore([githubApiInjector, apiMiddleware])

describe('ConnectedCommitPanel', (): void => {
  afterEach((): void => {
    nock.cleanAll()
  })

  it('should render without any issues', (): void => {
    const wrapper = mount(
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
          <ConnectedCommitPanel />
        </Provider>
      </MemoryRouter>
    )
    expect(wrapper.find('div').length).toBeGreaterThan(0)
  })

  it('should dispatch action for committing changes', (): void => {
    nock('https://api.github.com')
      .put((): boolean => true)
      .reply(200, { payload: 'OK!' })

    const store = mockStore({
      editor: {
        documentHasChanged: true,
        spec: 'This is the changed spec',
        currentSpecSHA: 'fgt343123dasd',
        currentCommitDescription: 'Made some endpoint changes',
        isCommitting: false,
      },
      global: { notifications: [] },
    })
    const wrapper = mount(
      <MemoryRouter initialEntries={['/edit/core::Service1']}>
        <Provider store={store}>
          <ConnectedCommitPanel />
        </Provider>
      </MemoryRouter>
    )
    act((): void => {
      enzymeFind(wrapper, CommitViewButton).simulate('click', { target: {} })
    })
    expect(store.getActions()).toEqual([{ type: COMMIT_CHANGES }])
  })

  it('should dispatch action for setting the currenct commit description', (): void => {
    const store = mockStore({
      editor: {
        documentHasChanged: true,
        spec: 'This is the changed spec',
        currentSpecSHA: 'fgt343123dasd',
        currentCommitDescription: 'Made some endpoint changes',
        isCommitting: false,
      },
      global: { notifications: [] },
    })
    const wrapper = mount(
      <MemoryRouter initialEntries={['/edit/core::Service1']}>
        <Provider store={store}>
          <ConnectedCommitPanel />
        </Provider>
      </MemoryRouter>
    )
    act((): void => {
      enzymeFind(wrapper, CommitViewTextArea).simulate('change', {
        target: { value: 'This is the new description' },
      })
    })
    expect(store.getActions()).toEqual([
      {
        type: SET_CURRENT_COMMIT_DESCRIPTION,
        commitDescription: 'This is the new description',
      },
    ])
  })

  it('should not dispatch action for committing changes if the current path is not the editor', (): void => {
    nock('https://api.github.com')
      .put((): boolean => true)
      .reply(200, { payload: 'OK!' })

    const store = mockStore({
      editor: {
        documentHasChanged: true,
        spec: 'This is the changed spec',
        currentSpecSHA: 'fgt343123dasd',
        currentCommitDescription: 'Made some endpoint changes',
        isCommitting: false,
      },
      global: { notifications: [] },
    })
    const wrapper = mount(
      <MemoryRouter initialEntries={['/']}>
        <Provider store={store}>
          <ConnectedCommitPanel />
        </Provider>
      </MemoryRouter>
    )
    act((): void => {
      enzymeFind(wrapper, CommitViewButton).simulate('click', { target: {} })
    })
    expect(store.getActions()).toEqual([])
  })
})
