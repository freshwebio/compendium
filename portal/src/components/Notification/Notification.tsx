import React, { useState, useEffect, useCallback } from 'react'

import {
  NotificationWrapper,
  NotificationIcon,
  NotificationClose,
  NotificationInsideWrapper,
} from './notification.styles'

export interface NotificationProps {
  message: string
  type: string
  onClose?: () => void
}

export const NOTIFICATION_LOAD_WAIT_TIME = 1000
export const NOTIFICATION_CLOSE_WAIT_TIME = 500

const Notification: React.FunctionComponent<NotificationProps> = ({
  message,
  type,
  onClose,
}): React.ReactElement => {
  const [loaded, setLoaded] = useState<boolean>(false)

  useEffect((): void => {
    // After mounting give the notification a second to update and re-render so the transition
    // loads the notification in.
    setTimeout((): void => {
      setLoaded(true)
    }, 1000)
  }, [])

  const close = useCallback((): void => {
    setLoaded(false)
    setTimeout((): void => {
      if (onClose) {
        onClose()
      }
    }, 500)
  }, [setLoaded, onClose])

  return (
    <NotificationWrapper>
      <NotificationInsideWrapper loaded={loaded} type={type}>
        {message}
        {type === 'error' ? (
          <NotificationIcon className="fas fa-exclamation-circle" />
        ) : (
          <NotificationIcon className="fas fa-check-circle" />
        )}
        <NotificationClose className="fas fa-times" onClick={close} />
      </NotificationInsideWrapper>
    </NotificationWrapper>
  )
}

export default Notification
