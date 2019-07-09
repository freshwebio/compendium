import uuidv4 from 'uuid/v4'

import {
  COMMIT_CHANGES_SUCCESS,
  COMMIT_CHANGES_FAILURE,
} from 'appredux/actions/editor/types'
import { addNotification } from 'appredux/actions/global'
import { setCurrentCommitDescription } from 'appredux/actions/editor'
import { Middleware, MiddlewareAPI, Dispatch, AnyAction } from 'redux'
import { MiddlewareFunction, DispatchFunction } from './types'
import {
  ADD_GROUP_SUCCESS,
  ADD_GROUP_FAILURE,
  ADD_SERVICE_SUCCESS,
  ADD_SERVICE_FAILURE,
} from 'appredux/actions/entities/types'

const apiNotifications: Middleware = (
  store: MiddlewareAPI<Dispatch<AnyAction>>
): MiddlewareFunction => (next: Dispatch<AnyAction>): DispatchFunction => (
  action: any
): any => {
  if (action) {
    if (action.type === COMMIT_CHANGES_SUCCESS) {
      store.dispatch(addNotification(uuidv4(), 'Changes committed', 'success'))
      // Reset the commit description as on success the next commit message will be something different.
      store.dispatch(setCurrentCommitDescription(''))
    } else if (action.type === COMMIT_CHANGES_FAILURE) {
      store.dispatch(
        addNotification(uuidv4(), 'Changes not committed, try again', 'error')
      )
    } else if (action.type === ADD_GROUP_SUCCESS) {
      store.dispatch(
        addNotification(uuidv4(), 'Service group created', 'success')
      )
    } else if (action.type === ADD_GROUP_FAILURE) {
      store.dispatch(
        addNotification(uuidv4(), 'Failed to create a new group', 'error')
      )
    } else if (action.type === ADD_SERVICE_SUCCESS) {
      store.dispatch(
        addNotification(uuidv4(), 'Service definition created', 'success')
      )
    } else if (action.type === ADD_SERVICE_FAILURE) {
      store.dispatch(
        addNotification(
          uuidv4(),
          'Failed to create a new service definition',
          'error'
        )
      )
    }
  }

  // Pass the FSA to the next action.
  return next(action)
}

export default apiNotifications
