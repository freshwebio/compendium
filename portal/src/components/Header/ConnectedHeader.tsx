import { connect } from 'react-redux'
import { Dispatch, AnyAction } from 'redux'
import Header from './Header'
import { EntitiesState } from '../../redux/reducers/entities'
import { addGroup } from '../../redux/actions/entities'
import { GlobalState } from 'appredux/reducers/global'
import { toggleDemoMode } from 'appredux/actions/global'

interface StateProps {
  entities: EntitiesState
  demoMode: boolean
}

interface DispatchProps {
  addGroup: (groupName: string) => void
  toggleDemoMode: () => void
}

const mapStateToProps = (
  state: { entities: EntitiesState; global: GlobalState },
  ownProps: any
): StateProps => {
  return {
    entities: state.entities,
    demoMode: state.global.demoMode,
  }
}

const mapDispatchToProps = (
  dispatch: Dispatch<AnyAction>,
  ownProps: any
): DispatchProps => {
  return {
    addGroup: (groupName: string): void => {
      dispatch(addGroup(groupName))
    },
    toggleDemoMode: (): void => {
      dispatch(toggleDemoMode())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
