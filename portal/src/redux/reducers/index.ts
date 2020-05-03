import { combineReducers } from 'redux'
import editor, { initialState as editorInitialState } from './editor'
import global, { initialState as globalInitialState } from './global'
import entities, { initialState as entitiesInitialState } from './entities'

export const initialState = {
  editor: editorInitialState,
  global: globalInitialState,
  entities: entitiesInitialState,
}

export default combineReducers({
  editor,
  global,
  entities,
})
