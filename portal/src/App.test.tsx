import React from 'react'
import ReactDOM from 'react-dom'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'

import App from './App'

const mockStore = configureMockStore([])

it('renders without crashing', (): void => {
  const div = document.createElement('div')
  ReactDOM.render(
    <Provider
      store={mockStore({
        editor: {
          documentHasChanged: false,
          spec: '',
          currentSpecSHA: '',
          currentCommitDescription: '',
          isCommitting: false,
        },
        global: { notifications: [] },
      })}
    >
      <App />
    </Provider>,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
})
