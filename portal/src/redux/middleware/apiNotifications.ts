import uuidv4 from 'uuid/v4'

import {
  COMMIT_CHANGES_SUCCESS,
  COMMIT_CHANGES_FAILURE,
} from 'appredux/actions/editor/types'
import { addNotification } from 'appredux/actions/global'
import { setCurrentCommitDescription } from 'appredux/actions/editor'
import { Middleware, MiddlewareAPI, Dispatch, AnyAction } from 'redux'
import { MiddlewareFunction, DispatchFunction } from './types'

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
    }
  }

  // Pass the FSA to the next action.
  return next(action)
}

export default apiNotifications
