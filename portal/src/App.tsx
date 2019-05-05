import React, { Fragment, useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from 'pages/Home'
import LoginCallback from 'pages/LoginCallback'
import PrivateRoute from 'components/PrivateRoute'
import { isLoggedIn, logout } from 'services/auth'
import Header from 'components/Header'
import Editor from 'pages/Editor'
import Notifications from 'components/Notifications'
import GlobalStyle from 'styles/globalStyle'

const logoutAndRedirect = (): void => {
  logout().then(
    (): void => {
      window.location.href = '/'
    }
  )
}

const App: React.SFC<any> = (): React.ReactElement => {
  const [loadingAndAccess, setLoadingAndAccess] = useState({
    isLoggedIn: false,
    isLoading: true,
  })

  useEffect((): void => {
    const checkLoggedIn = async (): Promise<void> => {
      const loggedIn = await isLoggedIn()
      setLoadingAndAccess({ isLoggedIn: loggedIn, isLoading: false })
    }
    checkLoggedIn()
  }, [])

  return (
    <Fragment>
      <GlobalStyle />
      <Router>
        <div className="App">
          <Header
            isLoading={loadingAndAccess.isLoading}
            isLoggedIn={loadingAndAccess.isLoggedIn}
            logout={logoutAndRedirect}
          />
          <Notifications />
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
        </div>
      </Router>
    </Fragment>
  )
}

export default App
