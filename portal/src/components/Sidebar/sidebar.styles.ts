import styled from 'styled-components'

const SidebarWrapper = styled('div')<any>`
  position: absolute;
  left: ${({ visible }): string => (visible ? '0' : '-187px')};
  height: calc(100vh - 50px);
  width: 220px;
  z-index: 3000;
  background: #1e1e1e;
  transition: left 500ms ease-in-out;
  -webkit-box-shadow: 8px 0 6px -6px black;
  -moz-box-shadow: 8px 0 6px -6px black;
  box-shadow: 8px 0 6px -6px black;
`

const ListIcon = styled.i<any>`
  opacity: ${({ visible }): string => (visible ? '0' : '1')};
  position: absolute;
  top: 5px;
  right: 8px;
  font-size: 12pt;
  color: #eeeeee;
  transition: opacity 200ms ease-in-out 400ms;
  z-index: 3001;
`

export { SidebarWrapper, ListIcon }
