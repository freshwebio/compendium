import React, { Fragment, useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from './pages/Home'
import LoginCallback from './pages/LoginCallback'
import './App.scss'
import PrivateRoute from './components/PrivateRoute'
import { isLoggedIn, logout } from './services/auth'
import Header from './components/Header'
import ConnectedEditor from './pages/ConnectedEditor'
import Notifications from './components/Notifications'
import GlobalStyle from './styles/globalStyle'

const logoutAndRedirect = () => {
  logout().then(() => {
    window.location.href = '/'
  })
}

const App: React.SFC<any> = () => {
  const [ loadingAndAccess, setLoadingAndAccess ] = useState({ isLoggedIn: false, isLoading: true })

  useEffect(() => {
    const checkLoggedIn = async () => {
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
              render={props => (
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
              render={props => (
                <LoginCallback
                  {...props}
                  setIsLoggedIn={(isLoggedIn: boolean) => {
                    setLoadingAndAccess({ isLoggedIn, isLoading: false })
                  }}
                />
              )}
            />
            <PrivateRoute
              path="/edit/:service"
              render={(props: any) => <ConnectedEditor {...props} />}
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
