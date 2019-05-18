import {
  SET_DOCUMENT_CHANGED,
  SET_CURRENT_DOCUMENT,
  SET_CURRENT_COMMIT_DESCRIPTION,
  COMMIT_CHANGES_SUCCESS,
  COMMIT_CHANGES,
  COMMIT_CHANGES_FAILURE,
} from 'appredux/actions/editor/types'

export interface EditorState {
  documentHasChanged: boolean
  spec: string
  currentSpecSHA: string
  currentCommitDescription: string
  isCommitting: boolean
}

const initialState = {
  documentHasChanged: false,
  spec: '',
  currentSpecSHA: '',
  currentCommitDescription: '',
  isCommitting: false,
}

const editorReducer = (state = initialState, action: any): EditorState => {
  switch (action.type) {
    case SET_DOCUMENT_CHANGED:
      return { ...state, documentHasChanged: action.changed }
    case SET_CURRENT_DOCUMENT:
      return {
        ...state,
        spec: action.content,
        currentSpecSHA: action.specSHA ? action.specSHA : state.currentSpecSHA,
      }
    case SET_CURRENT_COMMIT_DESCRIPTION:
      return { ...state, currentCommitDescription: action.commitDescription }
    case COMMIT_CHANGES:
      return { ...state, isCommitting: true }
    case COMMIT_CHANGES_SUCCESS:
      return {
        ...state,
        documentHasChanged: false,
        isCommitting: false,
        currentSpecSHA: action.payload.content.sha,
      }
    case COMMIT_CHANGES_FAILURE:
      return { ...state, documentHasChanged: true, isCommitting: false }
    default:
      return state
  }
}

export default editorReducer
