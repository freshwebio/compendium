import styled, { css } from 'styled-components'

const BackgroundLayer = styled('div')<{ visible: boolean }>`
  position: fixed;
  top: 50px;
  width: 100vw;
  height: calc(100vh - 50px);
  opacity: 0.76;
  visibility: hidden;
  background: white;
  z-index: 3500;

  ${({ visible }): any =>
    visible
      ? css`
          visibility: visible;
        `
      : ''}
`

export default BackgroundLayer
