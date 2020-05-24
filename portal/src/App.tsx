import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { connect, useDispatch, useSelector } from 'react-redux'
import { Dispatch, AnyAction } from 'redux'

import { isLoggedIn, logout } from 'services/auth'
import Header from 'components/Header'
import Notifications from 'components/Notifications'
import GlobalStyle from 'styles/globalStyle'
import Routes, { LoadingAndAccess } from './Routes'
import { GlobalState } from 'appredux/reducers/global'
import {
  toggleDemoMode as toggleDemoModeActionCreator,
  loginAccessCheck,
} from 'appredux/actions/global'
import { getPermissionLevel } from 'services/github'
import { ApydoxAppState } from 'appredux/reducers'

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
  const loadingAndAccess = useSelector(
    (state: ApydoxAppState) => state.global.loadingAndAccess
  )

  const dispatch = useDispatch()

  const setLoadingAndAccess = (loadingAndAccessRes: LoadingAndAccess): void => {
    dispatch(loginAccessCheck(loadingAndAccessRes))
  }

  useEffect((): void => {
    const checkLoggedIn = async (): Promise<void> => {
      const result = await isLoggedIn(demoMode)
      const permission = await getPermissionLevel(result.username, demoMode)
      setLoadingAndAccess({
        isLoggedIn: result.loggedIn,
        username: result.username,
        isLoading: false,
        permission,
      })
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
  dispatch: Dispatch<AnyAction>,
  ownProps: any
): DispatchProps => {
  return {
    toggleDemoMode: (): void => {
      dispatch(toggleDemoModeActionCreator())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
