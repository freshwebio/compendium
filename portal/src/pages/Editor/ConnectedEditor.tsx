import { connect } from 'react-redux'
import Editor from './Editor'
import { setDocumentChanged, setCurrentDocument } from 'appredux/actions/editor'
import { EditorState } from 'appredux/reducers/editor'

interface StateProps {
  editor: EditorState
}

interface DispatchProps {
  setDocumentChanged: (_: boolean) => void
  setCurrentDocument: (content: string, specSHA?: string) => void
}

const mapStateToProps = (state: { editor: EditorState }): StateProps => {
  return {
    editor: state.editor,
  }
}

const mapDispatchToProps = (dispatch: any): DispatchProps => {
  return {
    setDocumentChanged: (hasDocumentChanged: boolean): void => {
      dispatch(setDocumentChanged(hasDocumentChanged))
    },
    setCurrentDocument: (content: string, specSHA?: string): void => {
      dispatch(setCurrentDocument(content, specSHA))
    },
  }
}

const ConnectedEditor = connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor)

export default ConnectedEditor
