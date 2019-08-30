import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import { StyledTooltip } from 'components/Tooltip/tooltip.styles'

const StyledDisableableLink = styled(Link)<{ disabled: boolean }>`
  ${({ disabled }): any =>
    disabled
      ? css`
          opacity: 0.6;
          cursor: not-allowed;
        `
      : ''}
`

const StyledDisableableLinkWrapper = styled('div')<{ disabled: boolean }>`
  ${({ disabled }): any =>
    disabled
      ? css`
          &:hover {
            ${StyledTooltip} {
              visibility: visible;
            }
          }
        `
      : ''}
`

export { StyledDisableableLink, StyledDisableableLinkWrapper }
