import editorReducer from './editor'
import * as types from 'appredux/actions/editor/types'

const initialState = {
  documentHasChanged: false,
  spec: '',
  currentSpecSHA: '',
  currentCommitDescription: '',
  isCommitting: false,
}

describe('Editor reducer', (): void => {
  it('should update state correctly for whether or not the document has changed from the original action', (): void => {
    expect(
      editorReducer(initialState, {
        type: types.SET_DOCUMENT_CHANGED,
        changed: true,
      })
    ).toEqual({
      documentHasChanged: true,
      spec: '',
      currentSpecSHA: '',
      currentCommitDescription: '',
      isCommitting: false,
    })
  })

  it('should update state correctly when a document is updated action', (): void => {
    expect(
      // arrw ia awr ro undefined to use the initial state defined in the moudle.
      editorReducer(undefined, {
        type: types.SET_CURRENT_DOCUMENT,
        content: 'This is the new content for the spec',
      })
    ).toEqual({
      documentHasChanged: false,
      spec: 'This is the new content for the spec',
      currentSpecSHA: '',
      currentCommitDescription: '',
      isCommitting: false,
    })
  })

  it('should update state correctly when a new document is provided', (): void => {
    expect(
      editorReducer(initialState, {
        type: types.SET_CURRENT_DOCUMENT,
        content: 'This is a spec that has just been loaded in',
        specSHA: 'fsdf0329248asf',
      })
    ).toEqual({
      documentHasChanged: false,
      spec: 'This is a spec that has just been loaded in',
      currentSpecSHA: 'fsdf0329248asf',
      currentCommitDescription: '',
      isCommitting: false,
    })
  })

  it('should update state correctly when the commit description has changed', (): void => {
    expect(
      editorReducer(initialState, {
        type: types.SET_CURRENT_COMMIT_DESCRIPTION,
        commitDescription: 'Changes to the authentication endpoint',
      })
    ).toEqual({
      documentHasChanged: false,
      spec: '',
      currentSpecSHA: '',
      currentCommitDescription: 'Changes to the authentication endpoint',
      isCommitting: false,
    })
  })

  it('should update state accordingly when the process of commiting changes has started', (): void => {
    expect(
      editorReducer(initialState, {
        type: types.COMMIT_CHANGES,
      })
    ).toEqual({
      documentHasChanged: false,
      spec: '',
      currentSpecSHA: '',
      currentCommitDescription: '',
      isCommitting: true,
    })
  })

  it('should update state accordingly on a successful commit', (): void => {
    expect(
      editorReducer(initialState, {
        type: types.COMMIT_CHANGES_SUCCESS,
        payload: {
          content: {
            sha: '43224dasda02132',
          },
        },
      })
    ).toEqual({
      documentHasChanged: false,
      spec: '',
      currentSpecSHA: '43224dasda02132',
      currentCommitDescription: '',
      isCommitting: false,
    })
  })

  it('should update state accordingly on a failed commit', (): void => {
    expect(
      editorReducer(initialState, {
        type: types.COMMIT_CHANGES_FAILURE,
      })
    ).toEqual({
      documentHasChanged: true,
      spec: '',
      currentSpecSHA: '',
      currentCommitDescription: '',
      isCommitting: false,
    })
  })

  it('should return the original state for an action that is not handled by the reducer', (): void => {
    expect(
      editorReducer(
        {
          documentHasChanged: false,
          spec: '',
          currentSpecSHA: '',
          currentCommitDescription: '',
          isCommitting: false,
        },
        {
          type: 'MISSING-ACTION-TYPE',
        }
      )
    ).toEqual({
      documentHasChanged: false,
      spec: '',
      currentSpecSHA: '',
      currentCommitDescription: '',
      isCommitting: false,
    })
  })
})
