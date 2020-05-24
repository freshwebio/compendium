import {
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION,
  TOGGLE_DEMO_MODE,
  LOGIN_ACCESS_CHECK,
} from '../actions/global/types'
import { LoadingAndAccess } from 'Routes'
import { AnyAction } from 'redux'

export interface NotificationState {
  id: string
  message: string
  type: string
}

export interface GlobalState {
  notifications: NotificationState[]
  loadingAndAccess: LoadingAndAccess
  demoMode: boolean
}

export const initialState: GlobalState = {
  notifications: [],
  demoMode: !!(process.env.REACT_APP_DEMO_MODE || false),
  loadingAndAccess: {
    isLoggedIn: false,
    isLoading: true,
    username: '',
    permission: 'none',
  },
}

const globalReducer = (
  state = initialState,
  action: AnyAction
): GlobalState => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            id: action.id,
            message: action.message,
            type: action.notificationType,
          },
        ],
      }
    case REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification: NotificationState): boolean => {
            return notification.id !== action.id
          }
        ),
      }
    case TOGGLE_DEMO_MODE:
      return {
        ...state,
        demoMode: !state.demoMode,
      }
    case LOGIN_ACCESS_CHECK:
      return {
        ...state,
        loadingAndAccess: action.payload,
      }
    default:
      return state
  }
}

export default globalReducer
