import styled from 'styled-components'

const CommitPanelWrapper = styled('div')<any>`
  position: absolute;
  top: 50%;
  right: ${({ demoToggle }): string => (demoToggle ? '378px' : '240px')};
  transform: translateY(-50%);
  z-index: 3501;
`

export { CommitPanelWrapper }
