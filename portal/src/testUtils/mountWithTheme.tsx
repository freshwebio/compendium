import React from 'react'
import { mount, ReactWrapper } from 'enzyme'
import { ThemeProvider } from 'styled-components'

export default (element: any, theme: any): ReactWrapper =>
  mount(<ThemeProvider theme={theme}>{element}</ThemeProvider>)
