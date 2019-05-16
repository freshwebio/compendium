import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { apiMiddleware } from 'redux-api-middleware'
import reducer from './reducers'
import githubApiInjector from './middleware/githubApiInjector'
import apiNotifications from './middleware/apiNotifications'

const composeEnhancers = composeWithDevTools({
  name: 'apydox portal',
})

const middleware = applyMiddleware(
  githubApiInjector,
  apiMiddleware,
  apiNotifications
)

const store = (): any =>
  createStore(
    reducer,
    process.env.NODE_ENV !== 'production'
      ? composeEnhancers(middleware)
      : middleware
  )

export default store
