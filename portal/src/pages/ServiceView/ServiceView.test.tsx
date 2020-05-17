import React from 'react'
import { create, act, ReactTestRenderer } from 'react-test-renderer'
import { MemoryRouter } from 'react-router'

import { loadServiceDefinition, getApiDefs } from 'services/github'
import LoadingScreen from 'components/LoadingScreen'
import Sidebar from 'components/Sidebar'
import ServiceView from './ServiceView'

jest.mock('services/github', (): any => ({
  loadServiceDefinition: jest.fn(),
  getApiDefs: jest.fn(),
}))

const mockLoadServiceDefinition = (loadServiceDefinition as unknown) as jest.Mock<
  any
>
const mockGetApiDefs = (getApiDefs as unknown) as jest.Mock<any>

describe('ServiceView page', (): void => {
  beforeEach((): void => {
    mockLoadServiceDefinition.mockClear()
    mockLoadServiceDefinition.mockReturnValue(
      Promise.resolve({
        content: 'test content',
        sha: 'testsha324031fasfo12',
      })
    )
    mockGetApiDefs.mockClear()
    mockGetApiDefs.mockReturnValue(Promise.resolve([]))
  })

  it('should render without any issues and load the service definition along with the sidebar', async (): Promise<
    void
  > => {
    let renderer: ReactTestRenderer | null = null
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
    expect(mockLoadServiceDefinition).toHaveBeenCalledTimes(1)
    expect(
      ((renderer as unknown) as ReactTestRenderer).root.findAllByType(Sidebar)
        .length
    ).toBe(1)
    expect(
      ((renderer as unknown) as ReactTestRenderer).root.findAllByType(
        LoadingScreen
      ).length
    ).toBe(0)
  })

  it('should only render the loading screen and not the sidebar when the spec is still loading', async (): Promise<
    void
  > => {
    let renderer: ReactTestRenderer | null = null
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
    expect(
      ((renderer as unknown) as ReactTestRenderer).root.findAllByType(
        LoadingScreen
      ).length
    ).toBe(1)
    expect(
      ((renderer as unknown) as ReactTestRenderer).root.findAllByType(Sidebar)
        .length
    ).toBe(0)
  })

  it('should not crash when there is a failure in loading the service definitions from github', async (): Promise<
    void
  > => {
    mockLoadServiceDefinition.mockReturnValue(
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
