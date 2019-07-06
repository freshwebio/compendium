import React from 'react'
import { withRouter, matchPath, RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'

import { StyledHeader, ButtonLink, DashboardLink } from './header.styles'
import CommitPanel from 'components/CommitPanel'
import IconButton from 'components/IconButton'
import logo from 'assets/logo.svg'
import content from 'content.json'

type HeaderProps = RouteComponentProps<any> & {
  isLoading: boolean
  isLoggedIn: boolean
  logout: () => void
}

const Header: React.FunctionComponent<HeaderProps> = ({
  isLoading,
  isLoggedIn,
  logout,
  history,
}): React.ReactElement => {
  const { location } = history
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
      {editorMatch && !!editorMatch.params.service && (
        <>
          <DashboardLink to="/">
            <IconButton
              onClick={(): void => {}}
              iconClassName="fas fa-home"
              colour="white"
              iconFontSize="13pt"
            />
            {'dashboard'}
          </DashboardLink>
          <CommitPanel />
        </>
      )}
    </StyledHeader>
  )
}

export default withRouter(Header)
