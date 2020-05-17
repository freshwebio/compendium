import React from 'react'
import TestRenderer, { act, ReactTestRenderer } from 'react-test-renderer'
import { createMemoryHistory, createLocation } from 'history'

import Editor from './Editor'
import { MemoryRouter, withRouter, Route } from 'react-router'
import LoadingScreen from 'components/LoadingScreen'
import delay from 'utils/delay'

jest.mock('services/github')

const testMatch = {
  params: {},
  isExact: false,
  path: '',
  url: '',
}

describe('Editor', (): void => {
  it('should render without any issues', async (): Promise<void> => {
    let rendered: TestRenderer.ReactTestRenderer | null = null
    await act(
      async (): Promise<void> => {
        rendered = TestRenderer.create(
          <MemoryRouter>
            <Editor
              setCurrentDocument={jest.fn()}
              setDocumentChanged={jest.fn()}
              isLoggedIn={true}
              isLoading={false}
              demoMode={false}
              match={{ ...testMatch, params: { service: 'Service1' } }}
              history={createMemoryHistory()}
              location={createLocation('')}
              editor={{
                documentHasChanged: false,
                spec: '',
                currentSpecSHA: '',
                currentCommitDescription: '',
                isCommitting: false,
              }}
            />
          </MemoryRouter>
        )
      }
    )
    expect(
      ((rendered as unknown) as ReactTestRenderer).root.findAllByType('div')
        .length
    ).toBeGreaterThan(0)
    expect(
      ((rendered as unknown) as ReactTestRenderer).root.findAllByProps({
        id: 'swagger-editor',
      }).length
    ).toBe(1)
  })

  it('should contain the loading screen when in a loading state', (): void => {
    const rendered = TestRenderer.create(
      <MemoryRouter>
        <Editor
          setCurrentDocument={jest.fn()}
          setDocumentChanged={jest.fn()}
          isLoggedIn={true}
          isLoading={true}
          demoMode={false}
          match={{ ...testMatch, params: { service: 'Service1' } }}
          history={createMemoryHistory()}
          location={createLocation('')}
          editor={{
            documentHasChanged: false,
            spec: '',
            currentSpecSHA: '',
            currentCommitDescription: '',
            isCommitting: false,
          }}
        />
      </MemoryRouter>
    )
    expect(rendered.root.findAllByType(LoadingScreen).length).toBe(1)
  })

  it('should populate the swagger editor specification loaded from the api source', async (): Promise<
    void
  > => {
    const rendered = TestRenderer.create(
      <MemoryRouter>
        <Editor
          setCurrentDocument={jest.fn()}
          setDocumentChanged={jest.fn()}
          isLoggedIn={true}
          demoMode={false}
          isLoading={true}
          history={createMemoryHistory()}
          location={createLocation('')}
          match={{ ...testMatch, params: { service: 'Service1' } }}
          editor={{
            documentHasChanged: false,
            spec: '',
            currentSpecSHA: '',
            currentCommitDescription: '',
            isCommitting: false,
          }}
        />
      </MemoryRouter>
    )
    await act(
      async (): Promise<void> => {
        await delay(500)
      }
    )

    const editor = rendered.root.findByType(Editor)
    expect(editor.props.setCurrentDocument).toHaveBeenCalledWith(
      'This is an example specification',
      'dfsfd0432412312fGsdf'
    )
    expect(editor.instance.editor.specActions.updateSpec).toHaveBeenCalledWith(
      'This is an example specification'
    )
  })

  it(
    'should signify an update to the specification by calling the setCurrentDocument prop' +
      ' with the latest version of the document',
    async (): Promise<void> => {
      const setCurrentDocument = jest.fn()
      const setDocumentChanged = jest.fn()
      const rendered = TestRenderer.create(
        <MemoryRouter>
          <Editor
            setCurrentDocument={setCurrentDocument}
            setDocumentChanged={setDocumentChanged}
            isLoggedIn={true}
            isLoading={true}
            demoMode={false}
            match={{ ...testMatch, params: { service: 'Service1' } }}
            history={createMemoryHistory()}
            location={createLocation('')}
            editor={{
              documentHasChanged: false,
              spec: '',
              currentSpecSHA: '',
              currentCommitDescription: '',
              isCommitting: false,
            }}
          />
        </MemoryRouter>
      )
      await act(
        async (): Promise<void> => {
          await delay(500)
        }
      )
      const editor = rendered.root.findByType(Editor)
      expect(editor.instance).toBeDefined()
      expect(setDocumentChanged).not.toHaveBeenCalledWith(true)
      await act(
        async (): Promise<void> => {
          editor.instance.editor.specActions.updateSpec(
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
      expect(setCurrentDocument).toHaveBeenCalledWith(
        'This is a modified example specification'
      )
      expect(setDocumentChanged).toHaveBeenCalledWith(true)
    }
  )

  it(
    'should signify an update to the specification by calling the setCurrentDocument prop' +
      ' when the service has changed in the route',
    async (): Promise<void> => {
      const setCurrentDocument = jest.fn()
      const setDocumentChanged = jest.fn()
      const EnhancedEditor = withRouter(Editor)
      const rendered = TestRenderer.create(
        <MemoryRouter initialEntries={['/edit/Service1', '/edit/Service2']}>
          <Route
            path="/edit/:service"
            render={(props): React.ReactElement => (
              <EnhancedEditor
                setCurrentDocument={setCurrentDocument}
                setDocumentChanged={setDocumentChanged}
                isLoggedIn={true}
                isLoading={true}
                demoMode={false}
                editor={{
                  documentHasChanged: false,
                  spec: '',
                  currentSpecSHA: '',
                  currentCommitDescription: '',
                  isCommitting: false,
                }}
                {...props}
              />
            )}
          />
        </MemoryRouter>
      )
      // First let react state stabilise before triggering the new event.
      await act(
        async (): Promise<void> => {
          await delay(500)
        }
      )

      const editor = rendered.root.findByType(Editor)
      await act(
        async (): Promise<void> => {
          // Trigger the link click to go to the new route.
          editor.props.history.push('/edit/Service2')
        }
      )

      expect(setCurrentDocument).toHaveBeenCalledWith(
        'This is the specification for Service2',
        'QFAsfd0432412312fGsdf'
      )
      expect(
        editor.instance.editor.specActions.updateSpec
      ).toHaveBeenCalledWith('This is the specification for Service2')
    }
  )
})
