import globalReducer from './global'
import * as types from 'appredux/actions/global/types'

describe('Global reducer', (): void => {
  it('should update state correctly for when a new notification has been added', (): void => {
    expect(
      globalReducer(undefined, {
        type: types.ADD_NOTIFICATION,
        id: '42e423-fsf-4232-fsdf23',
        message: 'Changes saved',
        notificationType: 'success',
      })
    ).toEqual({
      notifications: [
        {
          id: '42e423-fsf-4232-fsdf23',
          message: 'Changes saved',
          type: 'success',
        },
      ],
      demoMode: false,
    })
  })

  it('should return the original state for an action that is not handled by the reducer', (): void => {
    expect(
      globalReducer(
        { notifications: [], demoMode: false },
        {
          type: 'MISSING-ACTION-TYPE',
        }
      )
    ).toEqual({
      notifications: [],
      demoMode: false,
    })
  })

  it('should update state correctly when a notification has been removed', (): void => {
    expect(
      globalReducer(
        {
          notifications: [
            {
              id: 'Ebqoeir0wri02-esfdgsaf-q313wqsda-213wasd',
              message: 'Changes saved',
              type: 'success',
            },
            {
              id: 'Xvsdfow-esfdgsaf-q313wqsda-213wasd',
              message: 'Failed to retrieve data',
              type: 'error',
            },
            {
              id: '3ewroifsdfw-esfdgsaf-q313wqsda-213wasd',
              message: 'Account updated',
              type: 'success',
            },
          ],
          demoMode: false,
        },
        {
          type: types.REMOVE_NOTIFICATION,
          id: 'Xvsdfow-esfdgsaf-q313wqsda-213wasd',
        }
      )
    ).toEqual({
      notifications: [
        {
          id: 'Ebqoeir0wri02-esfdgsaf-q313wqsda-213wasd',
          message: 'Changes saved',
          type: 'success',
        },
        {
          id: '3ewroifsdfw-esfdgsaf-q313wqsda-213wasd',
          message: 'Account updated',
          type: 'success',
        },
      ],
      demoMode: false,
    })
  })

  it('should update state correctly for toggling read only mode', (): void => {
    expect(
      globalReducer(undefined, {
        type: types.TOGGLE_DEMO_MODE,
      })
    ).toEqual({
      notifications: [],
      demoMode: true,
    })
  })
})
