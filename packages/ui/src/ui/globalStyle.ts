import { createGlobalStyle } from 'styled-components'
import { ApydoxTheme } from '@ui/themes/types'

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Lato', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 11px;
    line-height: 1.42857143;
    color: ${(props): string => (props.theme as ApydoxTheme).colours.black};
    margin: 0;
    padding: 0;
  }
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
  * {
    box-sizing: border-box;
  }
  p {
    margin: 0;
  }
`

export default GlobalStyle
