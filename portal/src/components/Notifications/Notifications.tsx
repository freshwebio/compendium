import React from 'react'

import Notification from 'components/Notification'
import { NotificationState } from 'appredux/reducers/global'

import { NotificationsWrapper } from './notifications.styles'

export interface NotificationsProps {
  notifications: NotificationState[]
  removeNotification?: (id: string) => void
}

const Notifications: React.FunctionComponent<NotificationsProps> = ({
  notifications,
  removeNotification,
}): React.ReactElement => {
  return (
    <NotificationsWrapper>
      {notifications.map(
        (notification): React.ReactElement => (
          <Notification
            key={notification.id}
            message={notification.message}
            type={notification.type}
            onClose={(): void => {
              if (removeNotification) {
                removeNotification(notification.id)
              }
            }}
          />
        )
      )}
    </NotificationsWrapper>
  )
}

export default Notifications
