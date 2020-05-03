import styled, { css } from 'styled-components'
import { StyledIcon } from 'components/IconButton/iconButton.styles'
import { Link } from 'react-router-dom'

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

  * {
    display: inline-block;
  }

  div.text {
    display: none;
  }

  @media screen and (min-width: 1024px) {
    div.text {
      display: inline-block;
    }
  }
`

const EditLink = styled(Link)`
  > * {
    display: inline-block;
  }

  > div {
    display: none;
  }

  @media screen and (min-width: 1024px) {
    > div {
      display: inline-block;
    }
  }
`

export { ExpandLinkWrapper, EditLink }
