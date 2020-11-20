import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router'
import { ThemeProvider } from 'styled-components'

import theme from 'styles/themes/compendiumv1'
import ApiDefGroup from './ApiDefGroup'
import ApiDefCard from 'components/ApiDefCard'

describe('ApiDefGroup', (): void => {
  it('should render without crashing', (): void => {
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <ApiDefGroup
          groupId="core-services"
          addService={(): void => {}}
          entities={{ isAddingGroup: false, addingServiceStates: {} }}
          group=""
          definitions={[]}
        />
      </ThemeProvider>
    )
    expect(wrapper.find('div').length).toBeGreaterThanOrEqual(1)
  })

  it('should contain a group title and the specified API definition cards', (): void => {
    const wrapper = mount(
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <ApiDefGroup
            group="Core services"
            groupId="core-services"
            addService={(): void => {}}
            entities={{ isAddingGroup: false, addingServiceStates: {} }}
            definitions={[
              { type: 'blob', path: 'core-services/Service1.yaml' },
              { type: 'blob', path: 'core-services/Service2.yaml' },
            ]}
          />
        </ThemeProvider>
      </MemoryRouter>
    )
    const title = wrapper.find('h3')
    expect(title.length).toBe(1)
    expect(title.text()).toInclude('Core services')
    const cards = wrapper.find(ApiDefCard)
    expect(cards.length).toBe(2)
  })
})
