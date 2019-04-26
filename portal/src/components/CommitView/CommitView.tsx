import React, { Fragment } from 'react'

import './CommitView.scss'
import Loader from '../../assets/images/loaderlight.svg'

class CommitView extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
  }

  updateCommitDescription = (evt: any) => {
    const { setCurrentCommitDescription } = this.props
    if (setCurrentCommitDescription) {
      setCurrentCommitDescription(evt.target.value)
    }
  }

  commitChanges = () => {
    if (this.props.commitDescription !== '' && this.props.commitChanges) {
      this.props.commitChanges(
        this.props.commitDescription,
        this.props.spec,
        this.props.currentSpecSHA
      )
    }
  }

  render() {
    const visibleClass = this.props.show ? 'visible' : ''
    const buttonExtraClass =
      this.props.commitDescription.length === 0 ? 'disabled' : ''

    return (
      <Fragment>
        <div className={`App-CommitView ${visibleClass}`}>
          {this.props.isCommitting ? (
            <img className="App-CentreItem" src={Loader} />
          ) : (
            <Fragment>
              {' '}
              <label
                className={`App-Label App-CommitView-Label`}
                htmlFor="App-CommitView-CommitChanges"
              >
                Describe your changes{' '}
                <span className="Required-Asterisk--Light">*</span>
              </label>
              <textarea
                id="App-CommitView-CommitChanges"
                className="App-CommitView-TextArea"
                value={this.props.commitDescription}
                onChange={this.updateCommitDescription}
              />
              <button
                className={`App-CommitView-Button ${buttonExtraClass}`}
                onClick={this.commitChanges}
              >
                Go on, commit
              </button>
            </Fragment>
          )}
        </div>
      </Fragment>
    )
  }
}

export default CommitView
