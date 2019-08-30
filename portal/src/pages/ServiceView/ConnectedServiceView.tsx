import { connect } from 'react-redux'
import ServiceView from './ServiceView'
import { GlobalState } from 'appredux/reducers/global'

interface StateProps {
  demoMode: boolean
}

const mapStateToProps = (state: { global: GlobalState }): StateProps => {
  return {
    demoMode: state.global.demoMode,
  }
}

const ConnectedServiceView = connect(mapStateToProps)(ServiceView)

export default ConnectedServiceView
