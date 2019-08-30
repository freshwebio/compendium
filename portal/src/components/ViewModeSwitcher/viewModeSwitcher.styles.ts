import styled, { css } from 'styled-components'
import { StyledIcon } from 'components/IconButton/iconButton.styles'

const ExpandLinkWrapper = styled('div')<{ disabled: boolean }>`
  ${({ disabled }): any =>
    !disabled
      ? css`
          ${StyledIcon} {
            transition: transform 300ms ease-in-out;
          }

          &:hover {
            ${StyledIcon} {
              transform: scaleX(1.4);
            }
          }
        `
      : ''}
`

export { ExpandLinkWrapper }
