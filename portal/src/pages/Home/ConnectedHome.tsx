import { connect } from 'react-redux'
import Home from './Home'
import { GlobalState } from 'appredux/reducers/global'

interface StateProps {
  demoMode: boolean
}

const mapStateToProps = (state: { global: GlobalState }): StateProps => {
  return {
    demoMode: state.global.demoMode,
  }
}

const ConnectedHome = connect(mapStateToProps)(Home)

export default ConnectedHome
