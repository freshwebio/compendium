import styled from 'styled-components'
import { Link } from 'react-router-dom'

const ApiDefCardText = styled.div`
  text-align: center;
  position: relative;
  top: 50%;
  padding: 6px 0;
  -ms-transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  background-color: #5b5b5b;
`

const ApiDefCardLink = styled(Link)`
  margin-right: 10px;
  margin-top: 20px;
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

  &:hover {
    background-color: #616161;
    border-top: 9px solid #7b7b7b;
    ${ApiDefCardText} {
      background-color: #7b7b7b;

      ::after {
        background-color: #7b7b7b;
      }
    }
  }
`

export { ApiDefCardLink, ApiDefCardText }
