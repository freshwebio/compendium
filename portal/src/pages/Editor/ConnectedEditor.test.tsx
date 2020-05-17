import React from 'react'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'

import { MemoryRouter, Route } from 'react-router'
import { act, create, ReactTestRenderer } from 'react-test-renderer'

import ConnectedEditor from './ConnectedEditor'
import {
  SET_DOCUMENT_CHANGED,
  SET_CURRENT_DOCUMENT,
} from 'appredux/actions/editor/types'
import delay from 'utils/delay'
import Editor from './Editor'

jest.mock('services/github')

const mockStore = configureMockStore([])

describe('ConnectedEditor', (): void => {
  it('should render without any issues', async (): Promise<void> => {
    let wrapper: ReactTestRenderer | null = null
    await act(
      async (): Promise<void> => {
        wrapper = create(
          <MemoryRouter initialEntries={['/edit/Service1']}>
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
              <Route
                path="/edit/:service"
                render={(props: any): React.ReactElement => (
                  // Setting isLoading to true means we don't have to load child components like the sidebar in.
                  <ConnectedEditor
                    isLoggedIn={false}
                    isLoading={true}
                    {...props}
                  />
                )}
              />
            </Provider>
          </MemoryRouter>
        )
      }
    )
    expect(
      ((wrapper as unknown) as ReactTestRenderer).root.findAllByType('div')
        .length
    ).toBeGreaterThan(0)
  })

  it("should dispatch action for when the document has changed from it's original state when loaded in", async (): Promise<
    void
  > => {
    const store = mockStore({
      editor: {
        documentHasChanged: true,
        spec: 'This is the changed spec',
        currentSpecSHA: 'fgt343123dasd',
        currentCommitDescription: 'Made some endpoint changes',
        isCommitting: false,
      },
      global: { notifications: [] },
    })
    let wrapper: ReactTestRenderer

    await act(
      async (): Promise<void> => {
        wrapper = create(
          <MemoryRouter initialEntries={['/edit/core::Service1']}>
            <Provider store={store}>
              <Route
                path="/edit/:service"
                render={(props: any): React.ReactElement => (
                  <ConnectedEditor
                    isLoggedIn={true}
                    isLoading={false}
                    {...props}
                  />
                )}
              />
            </Provider>
          </MemoryRouter>
        )
      }
    )

    await act(
      async (): Promise<void> => {
        // We need to access the swagger editor instance on the inner component.
        const innerEditor = wrapper.root.findByType(Editor).instance
        console.log(innerEditor)
        innerEditor.editor.specActions.updateSpec(
          'This is a modified example specification'
        )
      }
    )
    await act(
      async (): Promise<void> => {
        // @see __mocks__/swagger-editor.ts, we need to for a longer time than
        // the interval to ensure the change was propogated.
        await delay(200)
      }
    )

    const storeActions = store.getActions()
    expect(storeActions).toContainObject({
      type: SET_CURRENT_DOCUMENT,
      content: 'This is a modified example specification',
      specSHA: undefined,
    })
    expect(storeActions).toContainObject({
      type: SET_DOCUMENT_CHANGED,
      changed: true,
    })
  })
})
