import styled, { createGlobalStyle } from 'styled-components'

/**
 * Styles to be applied to the swagger ui view
 * which is not implemented with styled components,
 * this has it's own separate global
 * style as is only needed in swagger ui views.
 */
const ServiceViewStyles = createGlobalStyle`
body {
  overflow: hidden;
}

.swagger-ui {
  background-color: white;
  font-size: 1.3em;
  overflow: hidden;
  padding-left: 50px;

  @media screen and (min-width: 1560px) {
    padding-left: 0;
  }
}`

export const SwaggerUIWrapper = styled.div`
  height: calc(100vh - 50px);
  overflow-y: scroll;
  overflow-x: hidden;
`

export default ServiceViewStyles
