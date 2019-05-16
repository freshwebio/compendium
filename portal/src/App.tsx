import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import { isLoggedIn, logout } from 'services/auth'
import Header from 'components/Header'
import Notifications from 'components/Notifications'
import GlobalStyle from 'styles/globalStyle'
import Routes from './Routes'

const logoutAndRedirect = (): void => {
  logout().then(
    (): void => {
      window.location.href = '/'
    }
  )
}

const App: React.FunctionComponent<any> = (): React.ReactElement => {
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
    <>
      <GlobalStyle />
      <Router>
        <div className="App">
          <Header
            isLoading={loadingAndAccess.isLoading}
            isLoggedIn={loadingAndAccess.isLoggedIn}
            logout={logoutAndRedirect}
          />
          <Notifications />
          <Routes
            loadingAndAccess={loadingAndAccess}
            setLoadingAndAccess={setLoadingAndAccess}
          />
        </div>
      </Router>
    </>
  )
}

export default App
