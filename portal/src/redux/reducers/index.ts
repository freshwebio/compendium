import { combineReducers } from 'redux'
import editor, {
  initialState as editorInitialState,
  EditorState,
} from './editor'
import global, {
  initialState as globalInitialState,
  GlobalState,
} from './global'
import entities, {
  initialState as entitiesInitialState,
  EntitiesState,
} from './entities'

export type ApydoxAppState = {
  editor: EditorState
  global: GlobalState
  entities: EntitiesState
}

export const initialState: ApydoxAppState = {
  editor: editorInitialState,
  global: globalInitialState,
  entities: entitiesInitialState,
}

export default combineReducers({
  editor,
  global,
  entities,
})
