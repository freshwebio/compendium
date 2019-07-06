import { createGlobalStyle } from 'styled-components'

/**
 * Styles to be applied to the swagger editor
 * which is not implemented with styled components,
 * this has it's own separate global
 * style as is only needed in editor views.
 */
const EditorStyles = createGlobalStyle`
#swagger-editor {
  font-size: 1.3em;
}

.container {
  height: 100%;
  max-width: 880px;
  margin-left: auto;
  margin-right: auto;
}

#editor-wrapper {
  height: 100%;
  border: 1em solid #000;
  border: none;
}

.Pane2 {
  overflow-y: scroll;
}

.SplitPane {
  background-color: white;
}

.SplitPane .Pane:first-child {
  padding-left: 28px;
}
`

export default EditorStyles
