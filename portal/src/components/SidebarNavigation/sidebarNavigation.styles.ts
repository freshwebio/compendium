import styled from 'styled-components'

const NavItem = styled('li')<any>`
  padding: 5px 10px;
  border-bottom: 1px solid #ccc;
  background: ${({ active }): string => (active ? '#444' : 'transparent')};

  &:first-child {
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }

  &:last-child {
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
  }

  &:hover {
    background: #ccc;
  }

  a {
    display: block;
    width: 100%;
    color: ${({ active }): string => (active ? '#fff' : '#000')};
    text-decoration: none;
    font-size: 10pt;
  }
`

const NavWrapper = styled.ul`
  list-style-type: none;
  margin-left: 0;
  padding-left: 15px;
`

// Expecting styling that is nav group specific from design update.
const NavGroup = styled.li``

const NavDefinitions = styled.ul`
  background: #ddd;
  list-style-type: none;
  margin-left: 0;
  padding: 0;
  margin-right: 15px;
  margin-top: 10px;
  margin-bottom: 20px;
  border-radius: 3px;
  border: 1px solid #bbb;
`

const NavHeading = styled.div`
  font-size: 14pt;
  color: #777;
`

export { NavWrapper, NavGroup, NavDefinitions, NavHeading, NavItem }
