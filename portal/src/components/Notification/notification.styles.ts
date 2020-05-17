import styled, {
  css,
  FlattenSimpleInterpolation,
  ThemedStyledProps,
} from 'styled-components'
import { darken, lighten } from 'polished'
import { ApydoxTheme } from 'styles/themes/apydoxv1'

const NotificationIcon = styled.i`
  font-size: 20pt;
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
`

const NotificationClose = styled.i`
  font-size: 8pt;
  position: absolute;
  top: 3px;
  left: 3px;
  cursor: pointer;
`

const NotificationWrapper = styled.div`
  position: relative;
  width: 300px;
  height: 73px;
  margin-top: 20px;
  overflow: hidden;
`

export type NotificationInsideWrapperProps = ThemedStyledProps<
  {
    type: string
    loaded: boolean
  },
  ApydoxTheme
>

const NotificationInsideWrapper = styled('div')<NotificationInsideWrapperProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 22px 10px;
  font-size: 12pt;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  color: white;
  transition: transform 300ms ease-in-out;
  transform: ${({ loaded }): string =>
    loaded ? 'translateX(0)' : 'translateX(+100%)'};
  ${({ type, theme }): FlattenSimpleInterpolation =>
    type === 'success'
      ? css`
          background: ${theme.colours.green};
          border: 2px solid ${darken(0.1, theme.colours.green)};
          border-right: none;

          ${NotificationClose} {
            color: ${lighten(0.3, theme.colours.green)};
          }
        `
      : css`
          background: ${theme.colours.red};
          border: 2px solid ${darken(0.1, theme.colours.red)};
          border-right: none;

          ${NotificationClose} {
            color: ${lighten(0.3, theme.colours.red)};
          }
        `}
`

export {
  NotificationWrapper,
  NotificationInsideWrapper,
  NotificationIcon,
  NotificationClose,
}
