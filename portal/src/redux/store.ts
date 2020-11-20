import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { apiMiddleware } from 'redux-api-middleware'
import reducer, { initialState } from './reducers'
import githubApiInjector from './middleware/githubApiInjector'
import apiNotifications from './middleware/apiNotifications'
import demoModeInterceptor from './middleware/demoModeInterceptor'
import { loadState } from '../services/stateStorage'
import persistenceAndRedirection from './middleware/persistenceAndRedirection'

const composeEnhancers = composeWithDevTools({
  name: ' portal',
})

const middleware = applyMiddleware(
  githubApiInjector,
  demoModeInterceptor,
  apiMiddleware,
  apiNotifications,
  persistenceAndRedirection
)

const persistedState = loadState()

const store = (): any =>
  createStore(
    reducer,
    { ...initialState, ...persistedState },
    process.env.NODE_ENV !== 'production'
      ? composeEnhancers(middleware)
      : middleware
  )

export default store
