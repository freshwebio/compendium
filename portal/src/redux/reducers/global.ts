import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from '../actions/global/types'

export interface NotificationState {
  id: string
  message: string
  type: string
}

export interface GlobalState {
  notifications: NotificationState[]
}

const initialState: GlobalState = {
  notifications: [],
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
    default:
      return state
  }
}

export default globalReducer
