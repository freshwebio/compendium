import React from 'react'
import TestRenderer from 'react-test-renderer'

import { MemoryRouter, Route, Switch } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import LoadingScreen from 'components/LoadingScreen'

describe('PrivateRoute', (): void => {
  it('should produce a loading screen if we are currently in a loading state', (): void => {
    const rendered = TestRenderer.create(
      <MemoryRouter>
        <PrivateRoute isLoading={true} component={null} isLoggedIn={false} />
      </MemoryRouter>
    )
    const instance = rendered.root
    expect(instance.findAllByType(LoadingScreen).length).toBe(1)
  })

  it('should produce a redirect to the home page if a user is not logged in', (): void => {
    const TestComp = ({ text }: { text: string }): React.ReactElement => {
      return <div>{text}</div>
    }

    const rendered = TestRenderer.create(
      <MemoryRouter initialEntries={['/login', '/']}>
        <Switch>
          <PrivateRoute
            exact
            path="/login"
            isLoading={false}
            isLoggedIn={false}
            component={null}
          />
          <Route
            exact
            path="/"
            render={(): React.ReactElement => (
              <TestComp text="This is the test text" />
            )}
          />
        </Switch>
      </MemoryRouter>
    )
    const instance = rendered.root
    const testComp = instance.findAllByType(TestComp)
    expect(testComp.length).toBe(1)
    expect(testComp[0].props.text).toEqual('This is the test text')
  })

  it('should produce a view with the specified component when a user is logged in', (): void => {
    const TestComp = (): React.ReactElement => <div />
    const rendered = TestRenderer.create(
      <MemoryRouter>
        <PrivateRoute
          isLoading={false}
          isLoggedIn={true}
          component={TestComp}
        />
      </MemoryRouter>
    )
    const instance = rendered.root
    const testComp = instance.findAllByType(TestComp)
    expect(testComp.length).toBe(1)
  })

  it('should produce a view with the specified render props function when a user is logged in', (): void => {
    const TestComp = ({ text }: { text: string }): React.ReactElement => (
      <div>{text}</div>
    )
    const rendered = TestRenderer.create(
      <MemoryRouter>
        <PrivateRoute
          isLoading={false}
          isLoggedIn={true}
          render={(): React.ReactElement => (
            <TestComp text="This is the test text" />
          )}
        />
      </MemoryRouter>
    )
    const instance = rendered.root
    const testComp = instance.findAllByType(TestComp)
    expect(testComp.length).toBe(1)
    expect(testComp[0].props.text).toBe('This is the test text')
  })
})
