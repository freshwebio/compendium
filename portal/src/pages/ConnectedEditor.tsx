import { connect } from 'react-redux'
import Editor from './Editor'
import { setDocumentChanged, setCurrentDocument } from '../redux/actions/editor'
import { EditorState } from '../redux/reducers/editor'

const mapStateToProps = (state: { editor: EditorState }, ownProps: any) => {
  return {
    editor: state.editor,
  }
}

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
  return {
    setDocumentChanged: (hasDocumentChanged: boolean) => {
      dispatch(setDocumentChanged(hasDocumentChanged))
    },
    setCurrentDocument: (content: string, specSHA?: string) => {
      dispatch(setCurrentDocument(content, specSHA))
    },
  }
}

const ConnectedEditor = connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor)

export default ConnectedEditor
