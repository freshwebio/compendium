import entitiesReducer from './entities'
import * as types from 'appredux/actions/entities/types'

const initialState = {
  isAddingGroup: false,
  addingServiceStates: {},
}

describe('Entities reducer', (): void => {
  it('should update state accordingly when the process of adding a group has started', (): void => {
    expect(
      entitiesReducer(initialState, {
        type: types.ADD_GROUP,
      })
    ).toEqual({
      isAddingGroup: true,
      addingServiceStates: {},
    })
  })

  it('should update state accordingly when a group has been added', (): void => {
    expect(
      entitiesReducer(initialState, {
        type: types.ADD_GROUP_SUCCESS,
        payload: {
          content: {
            sha: '43224dasda02132',
          },
        },
      })
    ).toEqual({
      isAddingGroup: false,
      addingServiceStates: {},
    })
  })

  it('should update state accordingly on a failed attempt to add a group', (): void => {
    expect(
      entitiesReducer(initialState, {
        type: types.ADD_GROUP_FAILURE,
      })
    ).toEqual({
      isAddingGroup: false,
      addingServiceStates: {},
    })
  })

  it('should update state accordingly when the process of adding a service to a group has started', (): void => {
    expect(
      entitiesReducer(initialState, {
        type: types.ADD_SERVICE,
        meta: { groupId: 'core-services' },
      })
    ).toEqual({
      isAddingGroup: false,
      addingServiceStates: {
        'core-services': true,
      },
    })
  })

  it('should update state accordingly when a service has been added to a group', (): void => {
    expect(
      entitiesReducer(initialState, {
        type: types.ADD_SERVICE_SUCCESS,
        meta: { groupId: 'core-services' },
        payload: {
          content: {
            sha: '43224dasda02132',
          },
        },
      })
    ).toEqual({
      isAddingGroup: false,
      addingServiceStates: {
        'core-services': false,
      },
    })
  })

  it('should update state accordingly on a failed attempt to add a service to a group', (): void => {
    expect(
      entitiesReducer(initialState, {
        type: types.ADD_SERVICE_FAILURE,
        meta: { groupId: 'core-services' },
      })
    ).toEqual({
      isAddingGroup: false,
      addingServiceStates: {
        'core-services': false,
      },
    })
  })

  it('should return the original state for an action that is not handled by the reducer', (): void => {
    expect(
      entitiesReducer(
        {
          isAddingGroup: false,
          addingServiceStates: {},
        },
        {
          type: 'MISSING-ACTION-TYPE',
        }
      )
    ).toEqual({
      isAddingGroup: false,
      addingServiceStates: {},
    })
  })
})
