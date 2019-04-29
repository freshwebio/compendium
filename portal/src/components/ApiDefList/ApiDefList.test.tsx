import React from 'react'
import { act } from 'react-test-renderer'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router'

import { getApiDefs, ApiDefinitionGroup } from 'services/github'
import ApiDefList from './ApiDefList'
import ApiDefGroup from 'components/ApiDefGroup'
import delay from 'utils/delay'

jest.mock(
  'services/github',
  (): any => ({
    getApiDefs: jest.fn(),
  })
)

describe('ApiDefList', (): void => {
  it('should render without any issues and load in API definition groups', async (): Promise<
    void
  > => {
    getApiDefs.mockImplementation(
      (): Promise<ApiDefinitionGroup[]> =>
        Promise.resolve([
          {
            name: 'Core Services',
            id: 'core-services',
            definitions: [
              { path: 'core-services/Service1.yaml', type: 'blob' },
              { path: 'core-services/Service2.yaml', type: 'blob' },
            ],
          },
          {
            name: 'Integration Services',
            id: 'integration-services',
            definitions: [
              {
                path: 'integration-services/IntegrationService1.yaml',
                type: 'blob',
              },
              {
                path: 'integration-services/IntegrationService2.yaml',
                type: 'blob',
              },
              {
                path: 'integration-services/IntegrationService3.yaml',
                type: 'blob',
              },
            ],
          },
        ])
    )

    const wrapper = mount(
      <MemoryRouter>
        <ApiDefList />
      </MemoryRouter>
    )
    expect(wrapper.find(ApiDefGroup).length).toBe(0)
    // async act scoping to suppress warnings against setting hook state
    // outside of an act boundary and provide a consistent boundary where once we update
    // the appropriate state that matches that of the UI in the browser.
    await act(
      async (): Promise<void> => {
        await delay(100)
      }
    )
    // We must update the wrapper to force the latest render.
    wrapper.update()
    expect(wrapper.find(ApiDefGroup).length).toBe(2)
  })

  it('should render without any issues and fail gracefully in failure to load API definitions', async (): Promise<
    void
  > => {
    getApiDefs.mockImplementation(
      (): Promise<ApiDefinitionGroup[]> =>
        Promise.reject(new Error('Failed to load API definitions'))
    )

    const wrapper = mount(
      <MemoryRouter>
        <ApiDefList />
      </MemoryRouter>
    )
    expect(wrapper.find(ApiDefGroup).length).toBe(0)
    // Wait in an act boundary for asynchronous rejection response.
    await act(
      async (): Promise<void> => {
        await delay(100)
      }
    )
    // Update the wrapper to force the latest render.
    wrapper.update()
    expect(wrapper.find(ApiDefGroup).length).toBe(0)
  })
})
