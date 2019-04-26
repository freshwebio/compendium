import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

import Home from './pages/Home'
import LoginCallback from './pages/LoginCallback'
import './App.scss'
import PrivateRoute from './components/PrivateRoute'
import { isLoggedIn, logout } from './services/auth'
import Header from './components/Header'
import ConnectedEditor from './pages/ConnectedEditor'
import Notifications from './components/Notifications'

class App extends Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      isLoggedIn: false,
      isLoading: true,
      documentChanged: false,
      shouldCommitChanges: false,
      currentCommitDescription: '',
    }
  }

  async componentDidMount() {
    const loggedIn = await isLoggedIn()
    this.setState({ isLoggedIn: loggedIn, isLoading: false })
  }

  setDocumentChanged = (changed: boolean) => {
    this.setState({ documentChanged: changed })
  }

  setIsLoggedIn = (isLoggedIn: boolean) => {
    this.setState({ isLoggedIn, isLoading: false })
  }

  logout = () => {
    logout().then(() => {
      window.location.href = '/'
    })
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header
            isLoading={this.state.isLoading}
            isLoggedIn={this.state.isLoggedIn}
            logout={this.logout}
          />
          <Notifications />
          <Switch>
            <Route
              path="/"
              exact
              render={props => (
                <Home
                  {...props}
                  isLoggedIn={this.state.isLoggedIn}
                  isLoading={this.state.isLoading}
                />
              )}
            />
            <Route
              path="/login/oauth/callback"
              exact
              render={props => (
                <LoginCallback {...props} setIsLoggedIn={this.setIsLoggedIn} />
              )}
            />
            <PrivateRoute
              path="/edit/:service"
              render={(props: any) => <ConnectedEditor {...props} />}
              isLoggedIn={this.state.isLoggedIn}
              isLoading={this.state.isLoading}
            />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
