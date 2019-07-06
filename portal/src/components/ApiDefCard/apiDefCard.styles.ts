import styled from 'styled-components'
import { Link } from 'react-router-dom'

const ApiDefCardLink = styled(Link)`
  margin-right: 10px;
  margin-top: 10px;
  width: 300px;
  height: 150px;
  font-size: 1.3rem;
  font-weight: 300;
  background: #414141;
  border: 1px solid transparent;
  border-top: 9px solid #5b5b5b;
  border-radius: 2px;
  text-decoration: none;
  color: #c5c5c5;
`

const ApiDefCardText = styled.div`
  text-align: center;
  position: relative;
  top: 50%;
  padding: 6px 0;
  -ms-transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  background: #5b5b5b;

  ::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    width: 50%;
    height: 9px;
    background-color: #5b5b5b;
  }
`

export { ApiDefCardLink, ApiDefCardText }
