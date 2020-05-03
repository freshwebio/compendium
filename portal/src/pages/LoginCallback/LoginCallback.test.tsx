import React from 'react'
import { mount } from 'enzyme'

import LoginCallback from './LoginCallback'
import { MemoryRouter } from 'react-router'
import delay from 'utils/delay'

jest.mock('services/auth')

describe('LoginCallback', (): void => {
  it('should render without crashing', (): void => {
    const wrapper = mount(
      <MemoryRouter>
        <LoginCallback setIsLoggedIn={(): void => {}} />
      </MemoryRouter>
    )
    expect(wrapper.find(LoginCallback).length).toBe(1)
  })

  it('should render correctly and redirect a user after logging them in', async (): Promise<
    void
  > => {
    window.location.href =
      'https://localhost:4302/login-test?code=rfsdfg3231344Dw'
    const wrapper = mount(
      <MemoryRouter>
        <LoginCallback setIsLoggedIn={(): void => {}} />
      </MemoryRouter>
    )
    expect(wrapper.find(LoginCallback).length).toBe(1)
    // Will be asynchronous, so wait some time to ensure the redirect has occurred.
    await delay(100)
    expect(window.location.href).toBe('/')
  })

  it('should fail gracefully without crashing in the case we cannot retrieve an access token for a user', async (): Promise<
    void
  > => {
    window.location.href = 'https://localhost:4302/login-test?code=fail'
    const wrapper = mount(
      <MemoryRouter>
        <LoginCallback setIsLoggedIn={(): void => {}} />
      </MemoryRouter>
    )
    expect(wrapper.find(LoginCallback).length).toBe(1)
  })
})
