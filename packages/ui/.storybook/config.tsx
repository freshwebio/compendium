import * as React from 'react'
import { addDecorator, configure, addParameters } from '@storybook/react'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { withThemesProvider } from 'storybook-addon-styled-component-theme'
import { withKnobs } from '@storybook/addon-knobs'

import apydoxDefault from '../src/ui/themes/apydoxDefault'
import GlobalStyle from '../src/ui/globalStyle'

import apydoxStorybookTheme from './apydoxTheme'

const ApydoxStorybookStyle = createGlobalStyle`
  body {
    padding: 35px;
  }
`

class ApydoxThemeProvider extends React.Component<any> {
  render() {
    return (
      <ThemeProvider theme={this.props.theme}>
        <React.Fragment>
          <GlobalStyle />
          <ApydoxStorybookStyle />
          {this.props.children}
        </React.Fragment>
      </ThemeProvider>
    )
  }
}

const themes = [apydoxDefault]

addParameters({
  options: {
    theme: apydoxStorybookTheme,
  },
})

const req = require.context('../src', true, /\.stories\.tsx$/)

function loadStories() {
  req.keys().forEach(req)
}

configure(loadStories, module)

addDecorator(withThemesProvider(themes, ApydoxThemeProvider))
addDecorator(withKnobs)