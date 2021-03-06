import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const StyledHeader = styled.div`
  position: relative;
  background: #1e1e1e;
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 1rem;
  color: white;
  z-index: 3001;

  a {
    color: white;
    text-decoration: none;
  }
`

const ButtonLink = styled('button')<any>`
  background: transparent;
  position: absolute;
  right: 25px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0;
  outline: none;
  border: none;
  font-family: 'Roboto Slab', sans-serif;
  font-size: 0.88rem;
  cursor: pointer;
  color: ${({ colour }): string => colour};
`

const DashboardLink = styled(({ demoToggle, ...rest }): any => (
  <Link {...rest} />
))<any>`
  display: block;
  position: absolute;
  right: ${({ demoToggle }): string => (demoToggle ? '183px' : '94px')};
  font-size: 0.88rem;

  > div {
    display: none;
  }

  @media screen and (min-width: 1024px) {
    right: ${({ demoToggle }): string => (demoToggle ? '190px' : '104px')};
    > div {
      display: inline-block;
    }
  }
`

const ToggleWrapper = styled('div')<any>`
  display: block;
  position: absolute;
  right: 97px;
  font-size: 0.88rem;

  > * {
    display: inline-block;
    vertical-align: middle;
  }
`

const AddGroupWrapper = styled.div`
  position: absolute;
  left: 25px;
`

const LeftMenuWrapper = styled('div')<any>`
  position: absolute;
  left: 25px;
  font-size: 0.88rem;
`

export {
  StyledHeader,
  ButtonLink,
  DashboardLink,
  AddGroupWrapper,
  ToggleWrapper,
  LeftMenuWrapper,
}
