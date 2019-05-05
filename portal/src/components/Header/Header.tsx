import React from 'react'
import { withRouter, matchPath } from 'react-router'
import { Link } from 'react-router-dom'

import { StyledHeader, ButtonLink } from './header.styles'
import CommitPanel from 'components/CommitPanel'
import logo from 'assets/logo.svg'
import content from 'content.json'

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
      <StyledHeader>
        <Link to="/">
          <img src={content.global.logo || logo} height="40" alt="Logo" />
        </Link>
        {!isLoading && isLoggedIn && (
          <ButtonLink colour="white" onClick={logout}>
            Logout
          </ButtonLink>
        )}
        {editorMatch && !!editorMatch.params.service && <CommitPanel />}
      </StyledHeader>
    )
  }
}

export default withRouter(Header)
