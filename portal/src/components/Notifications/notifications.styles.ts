import styled from 'styled-components'

const NotificationsWrapper = styled.div`
  position: fixed;
  right: 0;
  top: 52px;
  height: calc(100vh - 52px);
  display: flex;
  flex-direction: column;
  z-index: 3000;
`

export { NotificationsWrapper }
