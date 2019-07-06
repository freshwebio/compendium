import styled from 'styled-components'

const NavItem = styled('li')<any>`
  margin-left: 15px;

  a {
    display: block;
    width: 100%;
    padding: 7px 2px;
    color: ${({ active }): string => (active ? '#ffffff' : '#cdcecd')};
    border-bottom: 1px solid
      ${({ active }): string => (active ? '#ffffff' : '#414141')};
    text-decoration: none;
    font-size: 10pt;

    &:hover {
      color: #ffffff;
      border-bottom: 1px solid #ffffff;
    }
  }
`

const NavWrapper = styled('ul')<{ visible: boolean }>`
  list-style-type: none;
  margin-left: 0;
  margin-top: 0;
  padding-left: 0;
  opacity: ${({ visible }): number => (visible ? 1 : 0)};
  transition: opacity 200ms ease-in-out 400ms;
`

// Expecting styling that is nav group specific from design update.
const NavGroup = styled.li``

const NavDefinitions = styled.ul`
  list-style-type: none;
  margin-left: 0;
  padding: 0;
  margin-right: 15px;
  margin-top: 10px;
  margin-bottom: 20px;
`

const NavHeading = styled.div`
  position: relative;
  padding-left: 15px;
  padding-right: 25px;
  padding-top: 4px;
  padding-bottom: 4px;
  font-size: 14px;
  font-weight: 300;
  color: #cdcece;
  background-color: #414141;

  ::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 15px;
    width: calc(100% - 30px);
    height: 4px;
    background-color: #414141;
  }
`

export { NavWrapper, NavGroup, NavDefinitions, NavHeading, NavItem }
