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
  outline: none;
  border: none;
  font-family: 'Roboto', sans-serif;
  font-size: 0.88rem;
  cursor: pointer;
  color: ${({ colour }): string => colour};
`

const DashboardLink = styled(Link)`
  display: block;
  position: absolute;
  right: 108px;
`

export { StyledHeader, ButtonLink, DashboardLink }
