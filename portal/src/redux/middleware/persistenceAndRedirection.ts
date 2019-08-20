import { Middleware, Dispatch, AnyAction, MiddlewareAPI } from 'redux'
import { DispatchFunction, MiddlewareFunction } from './types'
import { GlobalState } from 'appredux/reducers/global'
import { TOGGLE_DEMO_MODE } from 'appredux/actions/global/types'
import { saveState } from 'services/stateStorage'

const persistenceAndRedirection: Middleware = (
  store: MiddlewareAPI<Dispatch<AnyAction>, { global: GlobalState }>
): MiddlewareFunction => (next: Dispatch<AnyAction>): DispatchFunction => (
  action: any
): any => {
  const prevState = store.getState()
  if (action.type === TOGGLE_DEMO_MODE) {
    saveState({
      global: {
        // For hydrating from local storage we need to ensure all the
        // other things in global redux state are included.
        ...prevState.global,
        demoMode: !prevState.global.demoMode,
      },
    })
    // Redirect to the home page when the user toggles the demo mode to either
    // give them access.
    window.location.href = '/'
  }
  return next(action)
}

export default persistenceAndRedirection
