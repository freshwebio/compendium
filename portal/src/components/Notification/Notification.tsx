import React from 'react'

import './Notification.scss'

export interface NotificationProps {
  message: string
  type: string
  onClose?: () => void
}

class Notification extends React.Component<NotificationProps, any> {
  constructor(props: NotificationProps) {
    super(props)
    this.state = { loaded: false }
  }

  componentDidMount() {
    // After mounting give the notification a second to update and re-render so the transition
    // loads the notification in.
    setTimeout(() => {
      this.setState({ loaded: true })
    }, 1000)
  }

  close = () => {
    this.setState({ loaded: false })
    setTimeout(() => {
      if (this.props.onClose) {
        this.props.onClose()
      }
    }, 500)
  }

  render() {
    return (
      <div className={`App-Notification`}>
        <div
          className={`App-Notification-Inside ${this.props.type} ${
            this.state.loaded ? 'loaded' : ''
          }`}
        >
          {this.props.message}
          {this.props.type === 'error' ? (
            <i className="fas fa-exclamation-circle App-Notification-Icon" />
          ) : (
            <i className="fas fa-check-circle App-Notification-Icon" />
          )}
          <i
            className="fas fa-times App-Notification-Close"
            onClick={this.close}
          />
        </div>
      </div>
    )
  }
}

export default Notification
