import React, { Component, Fragment } from 'react'
import SwaggerEditor from 'swagger-editor'
import './Editor.scss'
import 'swagger-editor/dist/swagger-editor.css'
import Sidebar from 'components/Sidebar'
import { loadServiceDefinition } from 'services/github'
import LoadingScreen from 'components/LoadingScreen'

class Editor extends Component<any, any> {
  editor: any
  unsubscribe: any

  constructor(props: any) {
    super(props)
    this.state = { originalDocument: '' }
  }

  async componentDidMount() {
    if (this.props.isLoggedIn) {
      this.initSwaggerEditor()
    }
  }

  componentDidUpdate(prevProps: any) {
    const {
      match: { params },
      isLoggedIn,
    } = this.props
    const {
      match: { params: prevParams },
      isLoggedIn: prevIsLoggedIn,
    } = prevProps

    if (params.service !== prevParams.service) {
      loadServiceDefinition(params.service)
        .then((result: { content: string; sha: string }) => {
          this.setState({ originalDocument: result.content })
          this.editor.specActions.updateSpec(result.content)
          if (this.props.setCurrentDocument) {
            this.props.setCurrentDocument(result.content, result.sha)
          }
        })
        .catch(err => console.log(err))
    }

    if (isLoggedIn && isLoggedIn !== prevIsLoggedIn) {
      this.initSwaggerEditor()
    }
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  handleEditorChange = () => {
    const {
      setDocumentChanged,
      setCurrentDocument,
      editor: { spec: specInStore },
    } = this.props
    const state: Map<string, any> = this.editor.getStore().getState()
    const spec = state.get('spec').get('spec')
    if (setDocumentChanged) {
      if (spec !== this.state.originalDocument) {
        setDocumentChanged(true)
      } else {
        setDocumentChanged(false)
      }
    }

    if (setCurrentDocument && spec !== specInStore) {
      setCurrentDocument(spec)
    }
  }

  initSwaggerEditor = async () => {
    if (!this.editor) {
      const {
        match: { params },
        setCurrentDocument,
      } = this.props
      const result: {
        content: string
        sha: string
      } = await loadServiceDefinition(params.service)
      this.editor = SwaggerEditor({})
      this.editor.specActions.updateSpec(result.content)
      this.setState({ originalDocument: result.content })
      if (setCurrentDocument) {
        setCurrentDocument(result.content, result.sha)
      }
      this.unsubscribe = this.editor
        .getStore()
        .subscribe(this.handleEditorChange)
    }
  }

  render() {
    return (
      <Fragment>
        {this.props.isLoading ? (
          <LoadingScreen />
        ) : (
          <Fragment>
            <Sidebar />
            <div id="swagger-editor" />
          </Fragment>
        )}
      </Fragment>
    )
  }
}

export default Editor
