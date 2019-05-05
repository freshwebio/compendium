import styled from 'styled-components'

const HomeWrapper = styled.div`
  padding-top: 50px;
  text-align: center;
`

const LoginButton = styled.a`
  background: url('../../assets/images/GitHub-Mark-Light-64px.png'), #333;
  background-repeat: no-repeat;
  background-size: 32px 32px;
  background-position: 79px center;
  border: 1px solid #222;
  border-radius: 5px;
  height: 64px;
  font-family: Roboto, sans-serif;
  font-size: 18pt;
  text-decoration: none;
  color: white;
  padding: 10px;
  padding-right: 50px;

  &:hover {
    background: url('../../assets/images/GitHub-Mark-Light-64px.png'), #222;
    background-repeat: no-repeat;
    background-size: 32px 32px;
    background-position: 79px center;
    border: 1px solid #111;
  }
`

export { HomeWrapper, LoginButton }
