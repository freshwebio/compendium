import { RSAA } from 'redux-api-middleware'

import {
  setDocumentChanged,
  setCurrentCommitDescription,
  setCurrentDocument,
  commitChanges,
} from './'
import * as types from './types'

describe('Editor actions', (): void => {
  describe('setDocumentChanged', (): void => {
    it('should create a document changed action of the correct form', (): void => {
      expect(setDocumentChanged(true)).toEqual({
        type: types.SET_DOCUMENT_CHANGED,
        changed: true,
      })
    })
  })

  describe('setCurrentCommitDescription', (): void => {
    it('should create a current commit description action of the correct form', (): void => {
      expect(setCurrentCommitDescription('This is a brand new commit')).toEqual(
        {
          type: types.SET_CURRENT_COMMIT_DESCRIPTION,
          commitDescription: 'This is a brand new commit',
        }
      )
    })
  })

  describe('setCurrentDocument', (): void => {
    it('should create a changed current document action of the correct form with a specification SHA', (): void => {
      expect(
        setCurrentDocument('This is a specification', 'gasdf9423813wqsd')
      ).toEqual({
        type: types.SET_CURRENT_DOCUMENT,
        content: 'This is a specification',
        specSHA: 'gasdf9423813wqsd',
      })
    })

    it('should create a changed current document action of the correct form without a specification SHA', (): void => {
      expect(setCurrentDocument('This is another specification')).toEqual({
        type: types.SET_CURRENT_DOCUMENT,
        content: 'This is another specification',
      })
    })
  })

  describe('commitChanges', (): void => {
    it('should create a commit changes action of the correct form', (): void => {
      const rsaaAction = commitChanges(
        'internal/Service23.yaml',
        'A brand new change',
        'This is the specification',
        'fsdf49238fasdqjaa'
      )
      const { [RSAA]: actionDef } = rsaaAction
      expect(actionDef.endpoint).toBe('/contents/internal/Service23.yaml')
      expect(actionDef.method).toBe('PUT')
      expect(actionDef.headers).toEqual({ 'Content-Type': 'application/json' })
      const parsedBody = JSON.parse(actionDef.body)
      expect(parsedBody).toEqual({
        message: 'A brand new change',
        content: btoa('This is the specification'),
        sha: 'fsdf49238fasdqjaa',
      })
      expect(actionDef.types).toEqual([
        types.COMMIT_CHANGES,
        types.COMMIT_CHANGES_SUCCESS,
        types.COMMIT_CHANGES_FAILURE,
      ])
    })
  })
})
