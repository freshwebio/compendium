import styled, { css } from 'styled-components'

import { StyledTooltip } from 'components/Tooltip/tooltip.styles'

const StyledIcon = styled('i')<any>`
  ${({ iconFontSize, colour }): any => css`
    font-size: ${iconFontSize};
    color: ${colour};
  `}
`

const StyledIconButton = styled('button')<any>`
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;

  ${({ disabled }): any =>
    disabled
      ? css`
          cursor: not-allowed;
          ${StyledIcon} {
            opacity: 0.5;
          }
        `
      : ''}

  ${({ isTooltipContainer }): any =>
    isTooltipContainer
      ? css`
          &:hover {
            ${StyledTooltip} {
              visibility: visible;
            }
          }
        `
      : ''}
`

export { StyledIconButton, StyledIcon }
