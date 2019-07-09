import { connect } from 'react-redux'
import ApiDefList from './ApiDefList'
import makeFinishedSavingSelector from 'appredux/selectors/finishedSaving'

interface StateProps {
  finishedSaving: boolean
}

const makeMapStateToProps = (): ((state: any, props: any) => StateProps) => {
  const determineFinishedSaving = makeFinishedSavingSelector()
  const mapStateToProps = (state: any, props: any): StateProps => {
    return {
      finishedSaving: determineFinishedSaving(state, props),
    }
  }
  return mapStateToProps
}

const ConnectedApiDefList = connect(makeMapStateToProps)(ApiDefList)

export default ConnectedApiDefList
