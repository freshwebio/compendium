import { combineReducers } from 'redux'
import editor from './editor'
import global from './global'
import entities from './entities'

export default combineReducers({
  editor,
  global,
  entities,
})
