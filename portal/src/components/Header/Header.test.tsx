import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'

import Header from './Header'
import { ButtonLink } from './header.styles'
import CommitPanel from 'components/CommitPanel/CommitPanel'

const mockStore = configureMockStore([])

describe('Header', (): void => {
  it('should render without any issues', (): void => {
    const wrapper = mount(
      <MemoryRouter>
        <Header isLoading={false} isLoggedIn={true} logout={(): void => {}} />
      </MemoryRouter>
    )
    expect(wrapper.find('div').length).toBeGreaterThan(0)
  })

  it('should contain a logout link when authentication is complete and the user is logged in', (): void => {
    const wrapper = mount(
      <MemoryRouter>
        <Header isLoading={false} isLoggedIn={true} logout={(): void => {}} />
      </MemoryRouter>
    )
    const buttonLinks = wrapper.find(ButtonLink)
    expect(buttonLinks.length).toBe(1)
    expect(buttonLinks.text()).toBe('Logout')
  })

  it('should not contain a logout link when authentication is not yet finished', (): void => {
    const wrapper = mount(
      <MemoryRouter>
        <Header isLoading={true} isLoggedIn={false} logout={(): void => {}} />
      </MemoryRouter>
    )
    const buttonLinks = wrapper.find(ButtonLink)
    expect(buttonLinks.length).toBe(0)
  })

  it('should not contain a logout link when authentication is complete and the user is not logged in', (): void => {
    const wrapper = mount(
      <MemoryRouter>
        <Header isLoading={false} isLoggedIn={false} logout={(): void => {}} />
      </MemoryRouter>
    )
    const buttonLinks = wrapper.find(ButtonLink)
    expect(buttonLinks.length).toBe(0)
  })

  it('should not contain a commit panel when the current page is not for an edit service page', (): void => {
    const wrapper = mount(
      <MemoryRouter>
        <Header isLoading={false} isLoggedIn={true} logout={(): void => {}} />
      </MemoryRouter>
    )
    const commitPanel = wrapper.find(CommitPanel)
    expect(commitPanel.length).toBe(0)
  })

  it('should contain a commit panel when the current page is for an edit service page', (): void => {
    const wrapper = mount(
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
        <MemoryRouter initialEntries={['/edit/test-services::Service1']}>
          <Header isLoading={false} isLoggedIn={true} logout={(): void => {}} />
        </MemoryRouter>
      </Provider>
    )
    const commitPanel = wrapper.find(CommitPanel)
    expect(commitPanel.length).toBe(1)
  })
})
