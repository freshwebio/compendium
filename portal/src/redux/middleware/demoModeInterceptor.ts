import { Middleware, Dispatch, AnyAction, MiddlewareAPI } from 'redux'
import { RSAA } from 'redux-api-middleware'
import { COMMIT_CHANGES } from 'appredux/actions/editor/types'
import { DispatchFunction, MiddlewareFunction } from './types'
import { ADD_GROUP, ADD_SERVICE } from 'appredux/actions/entities/types'
import { GlobalState } from 'appredux/reducers/global'
import delay from 'utils/delay'

const demoModeActionTypes: string[] = [COMMIT_CHANGES, ADD_GROUP, ADD_SERVICE]

const extractTypeName = (rsaaType: any): string =>
  typeof rsaaType === 'object' ? rsaaType.type : rsaaType

const extractTypeNameAndActionBase = (
  rsaa: any,
  actionType: string
): { baseForAction: any; typeName: string } => {
  const rsaaSuccessType =
    rsaa.types[actionType === 'request' ? 0 : actionType === 'success' ? 1 : 2]

  return typeof rsaaSuccessType === 'object'
    ? { typeName: rsaaSuccessType.type, baseForAction: rsaaSuccessType }
    : { typeName: rsaaSuccessType, baseForAction: {} }
}

const isDemoModeEnabledAction = (rsaa: any): boolean => {
  const type = extractTypeName(rsaa.types[0])
  return demoModeActionTypes.includes(type)
}

const demoModeInterceptor: Middleware = (
  store: MiddlewareAPI<Dispatch<AnyAction>, { global: GlobalState }>
): MiddlewareFunction => (next: Dispatch<AnyAction>): DispatchFunction => (
  action: any
): any => {
  const rsaa = action[RSAA]
  const state = store.getState()

  // Check if this action is a supported rsaa api action and read only mode is on.
  if (rsaa && isDemoModeEnabledAction(rsaa) && state.global.demoMode) {
    // First dispatch the request action.
    const {
      baseForAction: baseForRequestAction,
      typeName: requestTypeName,
    } = extractTypeNameAndActionBase(rsaa, 'request')
    store.dispatch({ ...baseForRequestAction, type: requestTypeName })

    return (async (): Promise<any> => {
      // Wait 500ms before dispatching response actions to allow state to be updated with the saving state
      // and given the demo mode a more realistic feel in wait time.
      await delay(500)
      try {
        // Simply save the entire payload that contains the contents of the spec for services.
        localStorage.setItem(rsaa.endpoint, rsaa.body)
        const { baseForAction, typeName } = extractTypeNameAndActionBase(
          rsaa,
          'success'
        )
        store.dispatch({
          ...baseForAction,
          type: typeName,
          payload: {
            content: {
              // This is needed as the editor reducer sets the latest sha in state
              // for commit changes action, it will be present but unused for other actions.
              sha: 'dummy3g0sdg92rfqsaf',
            },
          },
        })
      } catch (err) {
        const { baseForAction, typeName } = extractTypeNameAndActionBase(
          rsaa,
          'failure'
        )
        store.dispatch({
          ...baseForAction,
          type: typeName,
          payload: err,
          error: true,
        })
      }
    })()
  } else {
    return next(action)
  }
}

export default demoModeInterceptor
