import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Editor from 'pages/Editor'
import Home from 'pages/Home'
import LoginCallback from 'pages/LoginCallback'
import PrivateRoute from 'components/PrivateRoute'

interface LoadingAndAccess {
  isLoggedIn: boolean
  isLoading: boolean
}

interface RoutesProps {
  loadingAndAccess: LoadingAndAccess
  setLoadingAndAccess: (_: LoadingAndAccess) => void
}

const Routes: React.FunctionComponent<RoutesProps> = ({
  loadingAndAccess,
  setLoadingAndAccess,
}): React.ReactElement => {
  return (
    <Switch>
      <Route
        path="/"
        exact
        render={(props): React.ReactElement => (
          <Home
            {...props}
            isLoggedIn={loadingAndAccess.isLoggedIn}
            isLoading={loadingAndAccess.isLoading}
          />
        )}
      />
      <Route
        path="/login/oauth/callback"
        exact
        render={(props): React.ReactElement => (
          <LoginCallback
            {...props}
            setIsLoggedIn={(isLoggedIn: boolean): void => {
              setLoadingAndAccess({ isLoggedIn, isLoading: false })
            }}
          />
        )}
      />
      <PrivateRoute
        path="/edit/:service"
        render={(props: any): React.ReactElement => <Editor {...props} />}
        isLoggedIn={loadingAndAccess.isLoggedIn}
        isLoading={loadingAndAccess.isLoading}
      />
    </Switch>
  )
}

export default Routes
