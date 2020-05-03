import React from 'react'
import { match } from 'react-router'
import IconButton from 'components/IconButton'
import DisableableLink from 'components/DisableableLink'
import { ExpandLinkWrapper, EditLink } from './viewModeSwitcher.styles'

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
        <EditLink to={`/edit/${viewMatch.params.service}`}>
          <IconButton
            iconClassName="fas fa-pen"
            colour="white"
            iconFontSize="13pt"
          />
          <div>{'edit'}</div>
        </EditLink>
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
            <div className="text">{'expand docs view'}</div>
          </DisableableLink>
        </ExpandLinkWrapper>
      )}
    </>
  )
}

export default ViewModeSwitcher
