import React from 'react'
import Notification from '../Notification'
import { NotificationState } from '../../redux/reducers/global'

import './Notifications.scss'

export interface NotificationsProps {
  notifications: NotificationState[]
  removeNotification: (id: string) => () => void
}

class Notifications extends React.Component<NotificationsProps, any> {
  removeNotification = (id: string) => () => {
    this.props.removeNotification(id)
  }

  render() {
    return (
      <div className="App-Notifications">
        {this.props.notifications.map(notification => (
          <Notification
            key={notification.id}
            message={notification.message}
            type={notification.type}
            onClose={this.removeNotification(notification.id)}
          />
        ))}
      </div>
    )
  }
}

export default Notifications
