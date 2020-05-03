import React from 'react'
import { act, create, ReactTestRenderer } from 'react-test-renderer'
import { MemoryRouter } from 'react-router'
import { Provider } from 'react-redux'
import createMockStore from 'redux-mock-store'
import { ThemeProvider } from 'styled-components'

import theme from 'styles/themes/apydoxv1'
import { getApiDefs, ApiDefinitionGroup } from 'services/github'
import ApiDefList from './ApiDefList'
import StandaloneApiDefGroup from 'components/ApiDefGroup/ApiDefGroup'
import delay from 'utils/delay'

jest.mock('services/github', (): any => ({
  getApiDefs: jest.fn(),
}))

const mockStore = createMockStore()

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

    let wrapper: ReactTestRenderer
    await act(
      async (): Promise<void> => {
        wrapper = create(
          <Provider
            store={mockStore({
              entities: { isAddingGroup: false, addingServiceStates: {} },
            })}
          >
            <MemoryRouter>
              <ThemeProvider theme={theme}>
                <ApiDefList finishedSaving={true} demoMode={false} />
              </ThemeProvider>
            </MemoryRouter>
          </Provider>
        )
      }
    )

    expect(wrapper.root.findAllByType(StandaloneApiDefGroup).length).toBe(2)
  })

  it('should render without any issues and fail gracefully in failure to load API definitions', async (): Promise<
    void
  > => {
    getApiDefs.mockImplementation(
      (): Promise<ApiDefinitionGroup[]> =>
        Promise.reject(new Error('Failed to load API definitions'))
    )

    let wrapper: ReactTestRenderer

    await act(
      async (): Promise<void> => {
        wrapper = create(
          <Provider
            store={mockStore({
              entities: { isAddingGroup: false, addingServiceStates: {} },
            })}
          >
            <MemoryRouter>
              <ThemeProvider theme={theme}>
                <ApiDefList finishedSaving={true} demoMode={false} />
              </ThemeProvider>
            </MemoryRouter>
          </Provider>
        )
      }
    )

    expect(wrapper.root.findAllByType(StandaloneApiDefGroup).length).toBe(0)
    // Wait in an act boundary for asynchronous rejection response.
    await act(
      async (): Promise<void> => {
        await delay(100)
      }
    )
    // Update the wrapper to force the latest render.
    expect(wrapper.root.findAllByType(StandaloneApiDefGroup).length).toBe(0)
  })
})
