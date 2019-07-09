import {
  ADD_GROUP,
  ADD_GROUP_SUCCESS,
  ADD_GROUP_FAILURE,
  ADD_SERVICE,
  ADD_SERVICE_SUCCESS,
  ADD_SERVICE_FAILURE,
} from 'appredux/actions/entities/types'

export interface EntitiesState {
  isAddingGroup: boolean
  addingServiceStates: { [groupId: string]: boolean }
}

const initialState = {
  isAddingGroup: false,
  addingServiceStates: {},
}

const entitiesReducer = (state = initialState, action: any): EntitiesState => {
  switch (action.type) {
    case ADD_GROUP:
      return { ...state, isAddingGroup: true }
    case ADD_GROUP_SUCCESS:
    case ADD_GROUP_FAILURE:
      return {
        ...state,
        isAddingGroup: false,
      }
    case ADD_SERVICE:
      return {
        ...state,
        addingServiceStates: {
          ...state.addingServiceStates,
          [action.meta.groupId]: true,
        },
      }
    case ADD_SERVICE_SUCCESS:
    case ADD_SERVICE_FAILURE:
      return {
        ...state,
        addingServiceStates: {
          ...state.addingServiceStates,
          [action.meta.groupId]: false,
        },
      }
    default:
      return state
  }
}

export default entitiesReducer
