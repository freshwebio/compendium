import styled from 'styled-components'

const CardsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
`

const Heading = styled('h3')<{ theme: any }>`
  position: relative;
  font-size: 1.5rem;
  font-weight: 300;
  background-color: #414141;
  color: #c5c5c5;
  padding: 10px;
  margin-bottom: 50px;

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

const ApiDefGroupWrapper = styled.div`
  :first-child {
    margin-top: 0;

    ${Heading} {
      margin-top: 0;
    }
  }
`

const AddServiceWrapper = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1rem;
  color: white;
  right: 30px;
  z-index: 300;
`

export { CardsWrapper, ApiDefGroupWrapper, Heading, AddServiceWrapper }
