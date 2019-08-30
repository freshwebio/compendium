import React from 'react'
import { mount } from 'enzyme'
import { Link, MemoryRouter } from 'react-router-dom'

import ApiDefCard from './ApiDefCard'

describe('ApiDefCard', (): void => {
  it('should render without any issues and contain the correct text and url for an API definition', (): void => {
    const wrapper = mount(
      <MemoryRouter>
        <ApiDefCard
          definition={{ path: 'core-services/AuthenticationService.yaml' }}
        />
      </MemoryRouter>
    )
    const link = wrapper.find(Link)
    expect(link.length).toBe(1)
    expect(link.props().to).toBe('/view/core-services::AuthenticationService')
    const textContainer = wrapper.find('div')
    expect(textContainer.text()).toBe('AuthenticationService')
  })

  it('should contain the correct text and url for an API definition without a group', (): void => {
    const wrapper = mount(
      <MemoryRouter>
        <ApiDefCard definition={{ path: 'AuthenticationService.yaml' }} />
      </MemoryRouter>
    )
    const link = wrapper.find(Link)
    expect(link.length).toBe(1)
    expect(link.props().to).toBe('/view/AuthenticationService')
    const textContainer = wrapper.find('div')
    expect(textContainer.text()).toBe('AuthenticationService')
  })
})
