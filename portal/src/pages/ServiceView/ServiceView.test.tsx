import React from 'react'
import { create, act, ReactTestRenderer } from 'react-test-renderer'
import { MemoryRouter } from 'react-router'

import LoadingScreen from 'components/LoadingScreen'
import Sidebar from 'components/Sidebar'
import ServiceView from './ServiceView'

jest.mock(
  'services/github',
  (): any => ({
    loadServiceDefinition: jest.fn(),
    getApiDefs: jest.fn(),
  })
)

/* eslint-disable */
import { loadServiceDefinition, getApiDefs } from 'services/github'

describe('ServiceView page', (): void => {
  beforeEach(
    (): void => {
      // @ts-ignore
      loadServiceDefinition.mockReset()
      // @ts-ignore
      loadServiceDefinition.mockReturnValue(
        Promise.resolve({
          content: 'test content',
          sha: 'testsha324031fasfo12',
        })
      )
      // @ts-ignore
      getApiDefs.mockReset()
      // @ts-ignore
      getApiDefs.mockReturnValue(Promise.resolve([]))
    }
  )

  it('should render without any issues and load the service definition along with the sidebar', async (): Promise<
    void
  > => {
    let renderer: ReactTestRenderer
    await act(
      async (): Promise<void> => {
        renderer = create(
          <MemoryRouter>
            <ServiceView
              match={{ params: { service: '' } }}
              demoMode={false}
              isLoading={false}
            />
          </MemoryRouter>
        )
      }
    )
    expect(loadServiceDefinition).toHaveBeenCalledTimes(1)
    expect(renderer.root.findAllByType(Sidebar).length).toBe(1)
    expect(renderer.root.findAllByType(LoadingScreen).length).toBe(0)
  })

  it('should only render the loading screen and not the sidebar when the spec is still loading', async (): Promise<
    void
  > => {
    let renderer: ReactTestRenderer
    await act(
      async (): Promise<void> => {
        renderer = create(
          <MemoryRouter>
            <ServiceView
              match={{ params: { service: '' } }}
              demoMode={false}
              isLoading={true}
            />
          </MemoryRouter>
        )
      }
    )
    // @ts-ignore
    expect(renderer.root.findAllByType(LoadingScreen).length).toBe(1)
    // @ts-ignore
    expect(renderer.root.findAllByType(Sidebar).length).toBe(0)
  })

  it('should not crash when there is a failure in loading the service definitions from github', async (): Promise<
    void
  > => {
    // @ts-ignore
    loadServiceDefinition.mockReturnValue(
      Promise.reject(new Error('test error'))
    )

    await act(
      async (): Promise<void> => {
        create(
          <MemoryRouter>
            <ServiceView
              match={{ params: { service: '' } }}
              demoMode={false}
              isLoading={true}
            />
          </MemoryRouter>
        )
      }
    )
  })
})
