import styled from 'styled-components'
import icon from 'assets/images/GitHub-Mark-Light-64px.png'

const HomeWrapper = styled.div`
  text-align: center;
`

const Heading = styled.h3`
  position: relative;
  font-size: 1.5rem;
  font-weight: 300;
  background-color: #414141;
  color: #c5c5c5;
  padding: 10px;
  margin-bottom: 50px;
  margin-top: 0;

  ::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    width: 50%;
    height: 9px;
    background-color: #414141;
  }
`

const SummaryText = styled.div`
  margin: 0 auto 15px;
  font-size: 16px;
  font-weight: 300;
  max-width: 600px;
`

const LoginButtonWrapper = styled.div`
  margin-top: 40px;
`

const LoginButton = styled.a`
  background: url(${icon}), #2e89e7;
  background-repeat: no-repeat;
  background-size: 32px 32px;
  background-position: 138px center;
  border: 1px solid #222;
  border-radius: 5px;
  height: 64px;
  font-family: 'Roboto Slab', sans-serif;
  font-size: 12pt;
  text-decoration: none;
  color: white;
  padding: 10px;
  padding-left: 70px;
  padding-right: 70px;
  text-align: center;

  &:hover {
    background: url(${icon}), #4c9ae8;
    background-repeat: no-repeat;
    background-size: 32px 32px;
    background-position: 138px center;
    border: 1px solid #111;
  }
`

export { HomeWrapper, LoginButtonWrapper, LoginButton, Heading, SummaryText }
