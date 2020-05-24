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
  if (action.type === TOGGLE_DEMO_MODE) {
    const prevState = store.getState()
    const { loadingAndAccess, ...restPrevGlobalState } = prevState.global
    saveState({
      global: {
        // For hydrating from local storage we need to ensure all the
        // other things in global redux state are included except from specific
        // parts like loading and access states that are temporary in nature.
        ...restPrevGlobalState,
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
