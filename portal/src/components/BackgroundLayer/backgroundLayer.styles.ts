import styled from 'styled-components'

const BackgroundLayer = styled('div')<{ visible: boolean }>`
  position: fixed;
  top: 50px;
  width: 100vw;
  height: calc(100vh - 50px);
  visibility: ${({ visible }): string => (visible ? 'visible' : 'hidden')};
  opacity: ${({ visible }): number => (visible ? 0.76 : 0)};
  background: white;
  z-index: 3500;
  transition: opacity 200ms ease-in-out 400ms;
`

export default BackgroundLayer
