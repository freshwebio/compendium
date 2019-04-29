import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import Notifications from './Notifications'
import { GlobalState, NotificationState } from '../../redux/reducers/global'

import { removeNotification } from '../../redux/actions/global'

interface StateProps {
  notifications: NotificationState[]
}

interface DispatchProps {
  removeNotification: (id: string) => void
}

const mapStateToProps = (
  state: { global: GlobalState },
  ownProps: any
): StateProps => {
  return {
    notifications: state.global.notifications,
  }
}

const mapDispatchToProps = (
  dispatch: Dispatch<any>,
  ownProps: any
): DispatchProps => {
  return {
    removeNotification: (id: string): void => {
      dispatch(removeNotification(id))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifications)
