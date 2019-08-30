import React from 'react'
import {
  StyledDisableableLink,
  StyledDisableableLinkWrapper,
} from './disableableLink.styles'
import Tooltip from 'components/Tooltip'

interface Props {
  disabled: boolean
  disabledMessage: string
  to: string
}

const DisableableLink: React.FunctionComponent<Props> = ({
  disabled,
  disabledMessage,
  to,
  children,
}): React.ReactElement => {
  return (
    <StyledDisableableLinkWrapper disabled={disabled}>
      <StyledDisableableLink
        to={to}
        disabled={disabled}
        onClick={(event): void => {
          if (disabled) {
            event.preventDefault()
          }
        }}
      >
        {children}
      </StyledDisableableLink>

      {disabled && <Tooltip text={disabledMessage} />}
    </StyledDisableableLinkWrapper>
  )
}

export default DisableableLink
