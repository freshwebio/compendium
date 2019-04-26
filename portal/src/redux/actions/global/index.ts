import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from './types'

export interface AddNotificationAction {
  type: string
  id: string
  message: string
  notificationType: string
}

export const addNotification = (
  id: string,
  message: string,
  notificationType: string
): AddNotificationAction => {
  return {
    type: ADD_NOTIFICATION,
    id,
    message,
    notificationType,
  }
}

export interface RemoveNotificationAction {
  type: string
  id: string
}

export const removeNotification = (id: string): RemoveNotificationAction => {
  return {
    type: REMOVE_NOTIFICATION,
    id,
  }
}
