import { RSAA } from 'redux-api-middleware'

import { addGroup, addService } from './'
import * as types from './types'
import defaultSpec from 'utils/defaultSpec'

describe('Entity actions', (): void => {
  describe('addGroup', (): void => {
    it('should create an add group action of the correct form', (): void => {
      const rsaaAction = addGroup('core services')
      const { [RSAA]: actionDef } = rsaaAction
      expect(actionDef.endpoint).toBe('/contents/core-services/.gitkeep')
      expect(actionDef.method).toBe('PUT')
      expect(actionDef.headers).toEqual({ 'Content-Type': 'application/json' })
      const parsedBody = JSON.parse(actionDef.body)
      expect(parsedBody).toEqual({
        message: 'Added new service group core services',
        content: '',
      })
      expect(actionDef.types).toEqual([
        types.ADD_GROUP,
        types.ADD_GROUP_SUCCESS,
        types.ADD_GROUP_FAILURE,
      ])
    })
  })

  describe('addService', (): void => {
    it('should create an add service action of the correct form', (): void => {
      const rsaaAction = addService('core-services', 'Configuration Service')
      const { [RSAA]: actionDef } = rsaaAction
      expect(actionDef.endpoint).toBe(
        '/contents/core-services/Configuration-Service.yaml'
      )
      expect(actionDef.method).toBe('PUT')
      expect(actionDef.headers).toEqual({ 'Content-Type': 'application/json' })
      const parsedBody = JSON.parse(actionDef.body)
      expect(parsedBody).toEqual({
        message:
          'Added API definition for the Configuration Service in core-services',
        content: btoa(defaultSpec),
      })
      expect(actionDef.types).toEqual([
        { type: types.ADD_SERVICE, meta: { groupId: 'core-services' } },
        { type: types.ADD_SERVICE_SUCCESS, meta: { groupId: 'core-services' } },
        { type: types.ADD_SERVICE_FAILURE, meta: { groupId: 'core-services' } },
      ])
    })
  })
})
