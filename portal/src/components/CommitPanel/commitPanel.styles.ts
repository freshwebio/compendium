import styled from 'styled-components'

const CommitPanelWrapper = styled('div')<{ demoToggle: any }>`
  position: absolute;
  top: 50%;
  right: ${({ demoToggle }): string => (demoToggle ? '225px' : '27px')};
  transform: translateY(-50%);
  z-index: 3501;

  @media screen and (min-width: 1024px) {
    right: ${({ demoToggle }): string => (demoToggle ? '305px' : '87px')};
  }
`

export { CommitPanelWrapper }
