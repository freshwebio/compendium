import { connect } from 'react-redux'
import { Dispatch } from 'redux'
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
  dispatch: Dispatch<any>,
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

export default connect(
  mapStateToProps,
  // @see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/31363#issuecomment-448013978
  // @ts-ignore
  mapDispatchToProps
)(Header)
