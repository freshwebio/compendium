import { connect } from 'react-redux'
import Editor from './Editor'
import { setDocumentChanged, setCurrentDocument } from 'appredux/actions/editor'
import { EditorState } from 'appredux/reducers/editor'
import { GlobalState } from 'appredux/reducers/global'

interface StateProps {
  editor: EditorState
  demoMode: boolean
}

interface DispatchProps {
  setDocumentChanged: (_: boolean) => void
  setCurrentDocument: (content: string, specSHA?: string) => void
}

const mapStateToProps = (state: {
  editor: EditorState
  global: GlobalState
}): StateProps => {
  return {
    editor: state.editor,
    demoMode: state.global.demoMode,
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
