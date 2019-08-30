import { connect } from 'react-redux'
import ViewModeSwitcher from './ViewModeSwitcher'
import { EditorState } from 'appredux/reducers/editor'

interface StateProps {
  documentHasChanged: boolean
}

const mapStateToProps = (state: { editor: EditorState }): StateProps => {
  return {
    documentHasChanged: state.editor.documentHasChanged,
  }
}

export default connect(mapStateToProps)(ViewModeSwitcher)
