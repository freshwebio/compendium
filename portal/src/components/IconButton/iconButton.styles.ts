import styled, { css } from 'styled-components'

import { StyledTooltip } from 'components/Tooltip/tooltip.styles'

const StyledIcon = styled('i')<any>`
  ${({ iconFontSize, colour, disabled }): any => css`
    font-size: ${iconFontSize};
    color: ${colour};
    opacity: ${disabled ? 0.5 : 1};
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
