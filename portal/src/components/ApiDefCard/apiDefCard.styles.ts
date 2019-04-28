import styled from 'styled-components'
import { Link } from 'react-router-dom'

const ApiDefCardLink = styled(Link)`
  margin-right: 10px;
  margin-top: 10px;
  width: 300px;
  height: 150px;
  font-size: 1.3rem;
  background: #eee;
  border: 1px solid #ddd;
  border-radius: 2px;
  text-decoration: none;
  color: #222;

  &:hover {
    background: #aaa;
    border: 1px solid #999;
    color: #fff;
  }
`

const ApiDefCardText = styled.div`
  text-align: center;
  position: relative;
  top: 50%;
  -ms-transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
`

export { ApiDefCardLink, ApiDefCardText }
