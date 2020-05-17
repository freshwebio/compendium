import React from 'react'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'

import { MemoryRouter } from 'react-router'
import { act, create, ReactTestRenderer } from 'react-test-renderer'

import ConnectedApiDefList from './ConnectedApiDefList'
import StandaloneApiDefList from './ApiDefList'

const mockStore = configureMockStore()

describe('ConnectedApiDefList', (): void => {
  it('should render without any issues', (): void => {
    const rendered = create(
      <MemoryRouter>
        <Provider
          store={mockStore({
            entities: { isAddingGroup: false, addingServiceStates: {} },
          })}
        >
          <ConnectedApiDefList />
        </Provider>
      </MemoryRouter>
    )
    expect(rendered.root.findAllByType('div').length).toBeGreaterThan(0)
  })

  it('should map the correct dervied finishedSaving state to props when currently adding a group', async (): Promise<
    void
  > => {
    const store = mockStore({
      entities: {
        isAddingGroup: true,
        addingServiceStates: { service1: false },
      },
    })

    let rendered: ReactTestRenderer | null = null
    await act(
      async (): Promise<void> => {
        rendered = create(
          <MemoryRouter>
            <Provider store={store}>
              <ConnectedApiDefList isLoggedIn={true} />
            </Provider>
          </MemoryRouter>
        )
      }
    )

    expect(
      ((rendered as unknown) as ReactTestRenderer).root.findByType(
        StandaloneApiDefList
      ).props.finishedSaving
    ).toBeFalse()
  })

  it('should map the correct dervied finishedSaving state to props when currently adding a service', async (): Promise<
    void
  > => {
    const store = mockStore({
      entities: {
        isAddingGroup: false,
        addingServiceStates: { service1: true, service2: false },
      },
    })

    let rendered: ReactTestRenderer | null = null
    await act(
      async (): Promise<void> => {
        rendered = create(
          <MemoryRouter>
            <Provider store={store}>
              <ConnectedApiDefList isLoggedIn={true} />
            </Provider>
          </MemoryRouter>
        )
      }
    )

    expect(
      ((rendered as unknown) as ReactTestRenderer).root.findByType(
        StandaloneApiDefList
      ).props.finishedSaving
    ).toBeFalse()
  })

  it('should map the correct dervied finishedSaving state to props when no entities are currently being added', async (): Promise<
    void
  > => {
    const store = mockStore({
      entities: {
        isAddingGroup: false,
        addingServiceStates: { service1: false, service2: false },
      },
    })

    let rendered: ReactTestRenderer | null = null
    await act(
      async (): Promise<void> => {
        rendered = create(
          <MemoryRouter>
            <Provider store={store}>
              <ConnectedApiDefList isLoggedIn={true} />
            </Provider>
          </MemoryRouter>
        )
      }
    )

    expect(
      ((rendered as unknown) as ReactTestRenderer).root.findByType(
        StandaloneApiDefList
      ).props.finishedSaving
    ).toBeTrue()
  })
})
