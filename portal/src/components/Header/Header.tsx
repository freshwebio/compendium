import React from 'react'
import { withRouter, matchPath, RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'

import {
  StyledHeader,
  ButtonLink,
  DashboardLink,
  AddGroupWrapper,
  ToggleWrapper,
  LeftMenuWrapper,
} from './header.styles'
import CommitPanel from 'components/CommitPanel'
import IconButton from 'components/IconButton'
import content from 'content.json'
import InlineAddField from 'components/InlineAddField'
import { EntitiesState } from 'appredux/reducers/entities'
import ViewModeSwitcher from 'components/ViewModeSwitcher'

type HeaderProps = RouteComponentProps<any> & {
  isLoading: boolean
  isLoggedIn: boolean
  entities: EntitiesState
  demoMode: boolean
  addGroup: (groupName: string) => void
  logout: () => void
  toggleDemoMode: () => void
}

const Header: React.FunctionComponent<HeaderProps> = ({
  isLoading,
  isLoggedIn,
  entities,
  demoMode,
  addGroup,
  logout,
  history,
  toggleDemoMode,
}): React.ReactElement => {
  const { location } = history
  const editorMatch = matchPath<any>(location.pathname, {
    path: '/edit/:service',
  })
  const viewMatch = matchPath<any>(location.pathname, {
    path: '/view/:service',
  })

  return (
    <StyledHeader>
      <Link to="/">
        {content.global.logo ? (
          <img src={content.global.logo} height="40" alt="Logo" />
        ) : (
          'Compendium'
        )}
      </Link>
      {!isLoading && isLoggedIn && (
        <ButtonLink colour="white" onClick={logout}>
          logout
        </ButtonLink>
      )}
      {process.env.REACT_APP_DEMO_MODE && (
        <ToggleWrapper>
          <IconButton
            onClick={toggleDemoMode}
            iconClassName={`fal ${demoMode ? 'fa-toggle-on' : 'fa-toggle-off'}`}
            colour="white"
            iconFontSize="1.5rem"
          />
          <div>{'demo'}</div>
        </ToggleWrapper>
      )}
      {((editorMatch && !!editorMatch.params.service) ||
        (viewMatch && !!viewMatch.params.service)) && (
        <>
          <DashboardLink to="/" demoToggle={process.env.REACT_APP_DEMO_MODE}>
            <IconButton
              onClick={(): void => {}}
              iconClassName="fas fa-home"
              colour="white"
              iconFontSize="13pt"
            />
            <div>{'dashboard'}</div>
          </DashboardLink>
          {editorMatch && <CommitPanel />}
        </>
      )}
      {(!editorMatch || !editorMatch.params.service) &&
        (!viewMatch || !viewMatch.params.service) &&
        isLoggedIn && (
          <AddGroupWrapper>
            <InlineAddField
              entityName={'group'}
              iconColour={'white'}
              alignment={'left'}
              onSave={addGroup}
              finished={!entities.isAddingGroup}
            />
          </AddGroupWrapper>
        )}
      {(viewMatch || editorMatch) && (
        <LeftMenuWrapper>
          <ViewModeSwitcher
            isLoggedIn={isLoggedIn}
            viewMatch={viewMatch}
            editorMatch={editorMatch}
          />
        </LeftMenuWrapper>
      )}
    </StyledHeader>
  )
}

export default withRouter(Header)
