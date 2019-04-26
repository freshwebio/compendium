import { combineReducers } from 'redux'
import editor from './editor'
import global from './global'

export default combineReducers({
  editor,
  global,
})
