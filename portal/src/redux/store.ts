import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { apiMiddleware } from 'redux-api-middleware'
import reducer from './reducers'
import githubApiInjector from './middleware/githubApiInjector'
import apiNotifications from './middleware/apiNotifications'

const composeEnhancers = composeWithDevTools({
  name: 'apydox portal',
})

const store = (): any =>
  createStore(
    reducer,
    composeEnhancers(
      applyMiddleware(githubApiInjector, apiMiddleware, apiNotifications)
    )
  )

export default store
