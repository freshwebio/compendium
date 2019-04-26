import uuidv4 from 'uuid/v4'

import {
  COMMIT_CHANGES_SUCCESS,
  COMMIT_CHANGES_FAILURE,
} from '../actions/editor/types'
import { addNotification } from '../actions/global'
import { setCurrentCommitDescription } from '../actions/editor'

export default (store: any) => (next: any) => (action: any) => {
  // Check if this action is for a successful
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
