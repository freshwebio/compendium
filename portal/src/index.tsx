import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'

import store from 'appredux/store'

import App from 'App'
import * as serviceWorker from 'serviceWorker'
import apydoxv1 from 'styles/themes/apydoxv1'

ReactDOM.render(
  <ThemeProvider theme={apydoxv1}>
    <Provider store={store()}>
      <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
