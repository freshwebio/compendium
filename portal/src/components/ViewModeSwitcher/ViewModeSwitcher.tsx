import React from 'react'
import { match } from 'react-router'
import { Link } from 'react-router-dom'
import IconButton from 'components/IconButton'
import DisableableLink from 'components/DisableableLink'
import { ExpandLinkWrapper } from './viewModeSwitcher.styles'

interface Props {
  isLoggedIn: boolean
  viewMatch: match<any> | null
  editorMatch: match<any> | null
  documentHasChanged: boolean
}

const ViewModeSwitcher: React.FunctionComponent<Props> = ({
  isLoggedIn,
  viewMatch,
  editorMatch,
  documentHasChanged,
}): React.ReactElement => {
  return (
    <>
      {viewMatch && viewMatch.params.service && isLoggedIn && (
        <Link to={`/edit/${viewMatch.params.service}`}>
          <IconButton
            iconClassName="fas fa-edit"
            colour="white"
            iconFontSize="13pt"
          />
          {'edit'}
        </Link>
      )}
      {editorMatch && editorMatch.params.service && isLoggedIn && (
        <ExpandLinkWrapper disabled={documentHasChanged}>
          <DisableableLink
            to={`/view/${editorMatch.params.service}`}
            disabled={documentHasChanged}
            disabledMessage={'Commit your changes first'}
          >
            <IconButton
              iconClassName="fas fa-arrows-h"
              colour="white"
              iconFontSize="11pt"
            />
            {'expand docs view'}
          </DisableableLink>
        </ExpandLinkWrapper>
      )}
    </>
  )
}

export default ViewModeSwitcher
