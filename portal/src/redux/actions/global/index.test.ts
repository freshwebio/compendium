import { addNotification, removeNotification } from './'
import * as types from './types'

describe('Global actions', (): void => {
  describe('addNotification', (): void => {
    it('should create an add notification action of the correct form', (): void => {
      expect(
        addNotification(
          'fsdf-323-dasdgge3-2321',
          'Changes have been saved',
          'success'
        )
      ).toEqual({
        type: types.ADD_NOTIFICATION,
        id: 'fsdf-323-dasdgge3-2321',
        message: 'Changes have been saved',
        notificationType: 'success',
      })
    })
  })

  describe('removeNotification', (): void => {
    it('should create a remove notification action of the correct form', (): void => {
      expect(removeNotification('XFdsfsQedasd-423-fasdas2-32asd')).toEqual({
        type: types.REMOVE_NOTIFICATION,
        id: 'XFdsfsQedasd-423-fasdas2-32asd',
      })
    })
  })
})
