import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { connect } from 'react-redux'

import { isLoggedIn, logout } from 'services/auth'
import Header from 'components/Header'
import Notifications from 'components/Notifications'
import GlobalStyle from 'styles/globalStyle'
import Routes from './Routes'
import { GlobalState } from 'appredux/reducers/global'
import { toggleDemoMode as toggleDemoModeActionCreator } from 'appredux/actions/global'
import { Dispatch } from 'redux'

const logoutAndRedirect = (
  toggleDemoMode: () => void,
  demoMode?: boolean
): void => {
  if (!demoMode) {
    logout().then((): void => {
      window.location.href = '/'
    })
  } else {
    toggleDemoMode()
  }
}

const App: React.FunctionComponent<any> = ({
  demoMode,
  toggleDemoMode,
}): React.ReactElement => {
  const [loadingAndAccess, setLoadingAndAccess] = useState({
    isLoggedIn: false,
    isLoading: true,
  })

  useEffect((): void => {
    const checkLoggedIn = async (): Promise<void> => {
      const loggedIn = await isLoggedIn(demoMode)
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
            logout={(): void => logoutAndRedirect(toggleDemoMode, demoMode)}
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

interface StateProps {
  demoMode: boolean
}

const mapStateToProps = (state: { global: GlobalState }): StateProps => {
  return {
    demoMode: state.global.demoMode,
  }
}

interface DispatchProps {
  toggleDemoMode: () => void
}

const mapDispatchToProps = (
  dispatch: Dispatch<any>,
  ownProps: any
): DispatchProps => {
  return {
    toggleDemoMode: (): void => {
      dispatch(toggleDemoModeActionCreator())
    },
  }
}

export default connect(
  mapStateToProps,
  // @ts-ignore
  mapDispatchToProps
)(App)
