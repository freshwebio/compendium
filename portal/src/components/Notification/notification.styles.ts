import styled, { css } from 'styled-components'

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

const NotificationInsideWrapper = styled('div')<any>`
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
  ${({ type }): any =>
    type === 'success'
      ? css`
          background: #49cc90;
          border: 2px solid darken(#49cc90, 10%);
          border-right: none;

          ${NotificationClose} {
            color: lighten(#49cc90, 30%);
          }
        `
      : css`
          background: #f93e3e;
          border: 2px solid darken(#f93e3e, 10%);
          border-right: none;

          ${NotificationClose} {
            color: lighten(#f93e3e, 30%);
          }
        `}
`

export {
  NotificationWrapper,
  NotificationInsideWrapper,
  NotificationIcon,
  NotificationClose,
}
