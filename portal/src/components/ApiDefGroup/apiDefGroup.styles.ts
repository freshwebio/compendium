import styled from 'styled-components'

const CardsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`

const ApiDefGroupWrapper = styled.div`
  margin-top: 50px;

  ::first-child {
    margin-top: 0;
  }
`

const Heading = styled('h3')<{ theme: any }>`
  position: relative;
  font-size: 1.5rem;
  font-weight: 300;
  background-color: #414141;
  color: #c5c5c5;
  padding: 10px;

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

export { CardsWrapper, ApiDefGroupWrapper, Heading }
