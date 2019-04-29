import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router'

import ApiDefGroup from './ApiDefGroup'
import ApiDefCard from 'components/ApiDefCard'

describe('ApiDefGroup', (): void => {
  it('should render without crashing', (): void => {
    const wrapper = mount(<ApiDefGroup group="" definitions={[]} />)
    expect(wrapper.find('div').length).toBeGreaterThanOrEqual(1)
  })

  it('should contain a group title and the specified API definition cards', (): void => {
    const wrapper = mount(
      <MemoryRouter>
        <ApiDefGroup
          group="Core services"
          definitions={[
            { type: 'blob', path: 'core-services/Service1.yaml' },
            { type: 'blob', path: 'core-services/Service2.yaml' },
          ]}
        />
      </MemoryRouter>
    )
    const title = wrapper.find('h3')
    expect(title.length).toBe(1)
    expect(title.text()).toBe('Core services')
    const cards = wrapper.find(ApiDefCard)
    expect(cards.length).toBe(2)
  })
})
