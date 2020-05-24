import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Editor from 'pages/Editor'
import ServiceView from 'pages/ServiceView'
import Home from 'pages/Home'
import LoginCallback from 'pages/LoginCallback'
import PrivateRoute from 'components/PrivateRoute'
import { RepoPermissionLevel } from 'services/github'

export interface LoadingAndAccess {
  isLoggedIn: boolean
  isLoading: boolean
  username: string
  permission: string
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
              setLoadingAndAccess({
                isLoggedIn,
                isLoading: false,
                // No need for username and permissions
                // as we are going to be redirected straight after this.
                username: '',
                permission: 'none',
              })
            }}
          />
        )}
      />
      <PrivateRoute
        path="/edit/:service"
        render={(props: any): React.ReactElement => <Editor {...props} />}
        isLoggedIn={loadingAndAccess.isLoggedIn}
        isLoading={loadingAndAccess.isLoading}
        username={loadingAndAccess.username}
        permission={loadingAndAccess.permission}
      />
      <PrivateRoute
        path="/view/:service"
        render={(props: any): React.ReactElement => <ServiceView {...props} />}
        isLoggedIn={loadingAndAccess.isLoggedIn}
        isLoading={loadingAndAccess.isLoading}
        username={loadingAndAccess.username}
        permission={loadingAndAccess.permission}
      />
    </Switch>
  )
}

export default Routes
