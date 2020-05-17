import { connect } from 'react-redux'
import { Dispatch, AnyAction } from 'redux'
import CommitPanel from './CommitPanel'
import { EditorState } from '../../redux/reducers/editor'
import {
  commitChanges,
  setCurrentCommitDescription,
} from '../../redux/actions/editor'
import { withRouter, matchPath } from 'react-router'
import { idToServiceDefinitionPath } from '../../utils/files'

interface StateProps {
  editor: EditorState
}

interface DispatchProps {
  commitChanges: (
    commitDescription: string,
    spec: string,
    currentSpecSHA: string
  ) => void
  setCurrentCommitDescription: (description: string) => void
}

const mapStateToProps = (
  state: { editor: EditorState },
  ownProps: any
): StateProps => {
  return {
    editor: state.editor,
  }
}

const mapDispatchToProps = (
  dispatch: Dispatch<AnyAction>,
  ownProps: any
): DispatchProps => {
  return {
    commitChanges: (
      commitDescription: string,
      spec: string,
      currentSpecSHA: string
    ): void => {
      const {
        history: { location },
      } = ownProps
      const editorMatch = matchPath<any>(location.pathname, {
        path: '/edit/:service',
      })

      if (editorMatch && editorMatch.params.service) {
        const serviceDefinitionPath = idToServiceDefinitionPath(
          editorMatch.params.service
        )
        dispatch(
          commitChanges(
            serviceDefinitionPath,
            commitDescription,
            spec,
            currentSpecSHA
          )
        )
      }
    },
    setCurrentCommitDescription: (description: string): void => {
      dispatch(setCurrentCommitDescription(description))
    },
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CommitPanel)
)
