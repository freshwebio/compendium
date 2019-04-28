import React from 'react'
import { withRouter, matchPath } from 'react-router'
import { Link } from 'react-router-dom'
import CommitPanel from '../CommitPanel'
import logo from '../../assets/logo.svg'
import content from '../../content.json'

class Header extends React.Component<any, any> {
  render(): React.ReactElement {
    const {
      isLoading,
      isLoggedIn,
      logout,
      history: { location },
    } = this.props
    const editorMatch = matchPath<any>(location.pathname, {
      path: '/edit/:service',
    })

    return (
      <header className="App-header">
        <Link to="/">
          <img src={content.global.logo || logo} height="40" alt="Logo" />
        </Link>
        {!isLoading && isLoggedIn && (
          <button className="App-link App-link--light" onClick={logout}>
            Logout
          </button>
        )}
        {editorMatch && !!editorMatch.params.service && <CommitPanel />}
      </header>
    )
  }
}

export default withRouter(Header)
