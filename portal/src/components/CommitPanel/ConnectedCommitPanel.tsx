import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import CommitPanel from './CommitPanel'
import { EditorState } from '../../redux/reducers/editor'
import {
  commitChanges,
  setCurrentCommitDescription,
} from '../../redux/actions/editor'
import { withRouter, matchPath } from 'react-router'
import { idToServiceDefinionPath } from '../../utils/files'

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
  dispatch: Dispatch<any>,
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
        const serviceDefinitionPath = idToServiceDefinionPath(
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
  connect(
    mapStateToProps,
    // @see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/31363#issuecomment-448013978
    // @ts-ignore
    mapDispatchToProps
  )(CommitPanel)
)
