import {
  SET_DOCUMENT_CHANGED,
  SET_CURRENT_COMMIT_DESCRIPTION,
  COMMIT_CHANGES,
  COMMIT_CHANGES_SUCCESS,
  COMMIT_CHANGES_FAILURE,
  SET_CURRENT_DOCUMENT,
} from './types'
import { RSAA } from 'redux-api-middleware'
import { sanitiseStringAlphaNumeric } from 'utils/sanitisation'

export interface SetDocumentChangedAction {
  type: string
  changed: boolean
}

export const setDocumentChanged = (
  changed: boolean
): SetDocumentChangedAction => {
  return {
    type: SET_DOCUMENT_CHANGED,
    changed,
  }
}

export interface SetCurrentCommitDescriptionAction {
  type: string
  commitDescription: string
}

export const setCurrentCommitDescription = (
  commitDescription: string
): SetCurrentCommitDescriptionAction => {
  return {
    type: SET_CURRENT_COMMIT_DESCRIPTION,
    commitDescription,
  }
}

export interface SetCurrentDocumentAction {
  type: string
  content: string
  specSHA: string | undefined
}

export const setCurrentDocument = (
  content: string,
  specSHA?: string
): SetCurrentDocumentAction => {
  return {
    type: SET_CURRENT_DOCUMENT,
    content,
    specSHA,
  }
}

export const commitChanges = (
  serviceDefinitionPath: string,
  commitDescription: string,
  spec: string,
  currentSpecSHA: string
): any => {
  return {
    [RSAA]: {
      endpoint: `/contents/${serviceDefinitionPath}`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: sanitiseStringAlphaNumeric(commitDescription),
        content: btoa(spec),
        sha: currentSpecSHA,
      }),
      types: [COMMIT_CHANGES, COMMIT_CHANGES_SUCCESS, COMMIT_CHANGES_FAILURE],
    },
  }
}
