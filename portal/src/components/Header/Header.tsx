import React from 'react'
import { withRouter, matchPath } from 'react-router'
import { Link } from 'react-router-dom'
import CommitPanel from '../CommitPanel'

class Header extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
  }

  render() {
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
        <Link to="/">MadSwaggerAPI Portal</Link>
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
