import { connect } from 'react-redux'
import { Dispatch, AnyAction } from 'redux'
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
  dispatch: Dispatch<AnyAction>,
  ownProps: any
): DispatchProps => {
  return {
    addService: (groupPath: string, serviceNameInput: string): void => {
      dispatch(addService(groupPath, serviceNameInput))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ApiDefGroup)
