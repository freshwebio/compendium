import styled from 'styled-components'

const LoadingScreenWrapper = styled.div`
  position: relative;
  height: calc(100vh - 54px);
  width: 100vw;
  background: #1e1e1e;

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200px;
    transform: translate(-50%, -50%);
  }
`

export { LoadingScreenWrapper }
