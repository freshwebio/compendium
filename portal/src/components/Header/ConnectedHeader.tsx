import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import Header from './Header'
import { EntitiesState } from '../../redux/reducers/entities'
import { addGroup } from '../../redux/actions/entities'

interface StateProps {
  entities: EntitiesState
}

interface DispatchProps {
  addGroup: (groupName: string) => void
}

const mapStateToProps = (
  state: { entities: EntitiesState },
  ownProps: any
): StateProps => {
  return {
    entities: state.entities,
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
  }
}

export default connect(
  mapStateToProps,
  // @see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/31363#issuecomment-448013978
  // @ts-ignore
  mapDispatchToProps
)(Header)
