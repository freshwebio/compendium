import styled from 'styled-components'

const SidebarWrapper = styled('div')<any>`
  position: absolute;
  left: ${({ visible }): string => (visible ? '0' : '-199px')};
  height: calc(100vh - 50px);
  width: 200px;
  z-index: 3000;
  background: #eeeeee;
  border-right: 1px solid #dddddd;
  transition: left 500ms ease-in-out;
  -webkit-box-shadow: 8px 0 6px -6px black;
  -moz-box-shadow: 8px 0 6px -6px black;
  box-shadow: 8px 0 6px -6px black;
`

const CaretIcon = styled.i`
  position: absolute;
  right: -12px;
  font-size: 20pt;
  color: #eeeeee;
  text-shadow: 2px 2px 4px black;
  cursor: pointer;
`

export { SidebarWrapper, CaretIcon }
