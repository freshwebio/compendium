import styled from 'styled-components'

const StyledHeader = styled.div`
  position: relative;
  background: #2d2d2d;
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

export { StyledHeader, ButtonLink }
