import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { ThemeProvider } from 'styled-components'

export default (element: any, theme: any): ShallowWrapper =>
  shallow(<ThemeProvider theme={theme}>{element}</ThemeProvider>)
