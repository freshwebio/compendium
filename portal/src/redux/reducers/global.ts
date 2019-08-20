import {
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION,
  TOGGLE_DEMO_MODE,
} from '../actions/global/types'

export interface NotificationState {
  id: string
  message: string
  type: string
}

export interface GlobalState {
  notifications: NotificationState[]
  demoMode: boolean
}

const initialState: GlobalState = {
  notifications: [],
  demoMode: !!(process.env.REACT_APP_DEMO_MODE || false),
}

const globalReducer = (state = initialState, action: any): GlobalState => {
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
    default:
      return state
  }
}

export default globalReducer
