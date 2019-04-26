import React, { Fragment } from 'react'

import './CommitPanel.scss'
import Tooltip from '../Tooltip'
import CommitView from '../CommitView'

class CommitPanel extends React.Component<any, any> {
  commitPanelRef: React.RefObject<HTMLDivElement>
  constructor(props: any) {
    super(props)
    this.state = { showView: false }
    this.commitPanelRef = React.createRef()
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.documentClick)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.documentClick)
  }

  documentClick = (evt: any) => {
    // If the view is currently displayed and a click outside is made
    // then hide the view.
    if (
      this.state.showView &&
      this.commitPanelRef.current &&
      !this.commitPanelRef.current.contains(evt.target)
    ) {
      this.setState({ showView: false })
    }
  }

  showOrHideView = () => {
    const {
      editor: { documentHasChanged },
    } = this.props
    if (documentHasChanged) {
      this.setState((prevState: any) => ({ showView: !prevState.showView }))
    }
  }

  render() {
    const {
      editor: {
        documentHasChanged,
        currentCommitDescription: commitDescription,
        spec,
        currentSpecSHA,
        isCommitting,
      },
    } = this.props
    const extraClasses = !documentHasChanged ? 'disabled' : ''
    return (
      <Fragment>
        <div
          className={`App-BackgroundLayer ${
            documentHasChanged && this.state.showView ? 'visible' : ''
          }`}
        />
        <div className={`App-CommitPanel`} ref={this.commitPanelRef}>
          <button
            className={`App-button App-tooltip-container ${extraClasses}`}
            onClick={this.showOrHideView}
            disabled={!documentHasChanged}
          >
            <i className="App-CommitPanel-Icon far fa-code-commit" />
            <Tooltip text={'Commit changes'} />
          </button>
          <CommitView
            show={this.state.showView && documentHasChanged}
            commitChanges={this.props.commitChanges}
            commitDescription={commitDescription}
            spec={spec}
            currentSpecSHA={currentSpecSHA}
            isCommitting={isCommitting}
            setCurrentCommitDescription={this.props.setCurrentCommitDescription}
          />
        </div>
      </Fragment>
    )
  }
}

export default CommitPanel
