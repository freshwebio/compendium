import {
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION,
  TOGGLE_DEMO_MODE,
} from './types'

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

export interface ToggleDemoModeAction {
  type: string
}

export const toggleDemoMode = (): ToggleDemoModeAction => {
  return {
    type: TOGGLE_DEMO_MODE,
  }
}
