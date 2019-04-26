import React from 'react'

import './Sidebar.scss'
import { getApiDefs } from '../../services/github'
import SidebarNavigation from '../SidebarNavigation'
import { withRouter } from 'react-router'

class Sidebar extends React.Component<any, any> {
  sidebarRef: React.RefObject<HTMLDivElement>
  constructor(props: any) {
    super(props)
    this.state = { visible: false, apiDefinitionGroups: [] }
    this.sidebarRef = React.createRef()
  }

  async componentDidMount() {
    try {
      const apiDefs = await getApiDefs()
      this.setState({ apiDefinitionGroups: apiDefs })
    } catch (err) {
      console.log(err)
    }

    document.addEventListener('mousedown', this.documentClick)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.documentClick)
  }

  documentClick = (evt: any) => {
    // If the view is currently displayed and a click outside is made
    // then hide the view.
    if (
      this.state.visible &&
      this.sidebarRef.current &&
      !this.sidebarRef.current.contains(evt.target)
    ) {
      this.setState({ visible: false })
    }
  }

  componentDidUpdate(prevProps: any) {
    const {
      match: { params },
    } = this.props
    const {
      match: { params: prevParams },
    } = prevProps
    if (params.service && params.service !== prevParams.service) {
      this.setState({ visible: false })
    }
  }

  toggleVisibility = () => {
    this.setState((prevState: any) => ({ visible: !prevState.visible }))
  }

  render() {
    const extraClass = this.state.visible ? 'visible' : ''
    const caretDirection = this.state.visible ? 'left' : 'right'
    return (
      <div className={`madswagger-sidebar ${extraClass}`} ref={this.sidebarRef}>
        <i
          className={`fas fa-caret-${caretDirection} madswagger-caret`}
          onClick={this.toggleVisibility}
        />
        <SidebarNavigation groups={this.state.apiDefinitionGroups} />
      </div>
    )
  }
}

export default withRouter(Sidebar)
