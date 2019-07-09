import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import ApiDefGroup from './ApiDefGroup'
import { EntitiesState } from '../../redux/reducers/entities'
import { addService } from '../../redux/actions/entities'

interface StateProps {
  entities: EntitiesState
}

interface DispatchProps {
  addService: (groupPath: string, serviceNameInput: string) => void
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
    addService: (groupPath: string, serviceNameInput: string): void => {
      dispatch(addService(groupPath, serviceNameInput))
    },
  }
}

export default connect(
  mapStateToProps,
  // @see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/31363#issuecomment-448013978
  // @ts-ignore
  mapDispatchToProps
)(ApiDefGroup)
