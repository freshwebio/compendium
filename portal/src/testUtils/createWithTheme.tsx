import React from 'react'
import { create, ReactTestRenderer } from 'react-test-renderer'
import { ThemeProvider } from 'styled-components'

export default (element: any, theme: any): ReactTestRenderer =>
  create(<ThemeProvider theme={theme}>{element}</ThemeProvider>)
