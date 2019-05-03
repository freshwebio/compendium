import React, { useCallback } from 'react'

import './CommitPanel.scss'
import Tooltip from 'components/Tooltip'
import CommitView from 'components/CommitView'
import { EditorState } from 'appredux/reducers/editor'
import useCollapsibleView from 'hooks/useCollapsibleView'

interface CommitPanelProps {
  editor: EditorState
  commitChanges: () => void
  setCurrentCommitDescription: () => void
}

const CommitPanel: React.FunctionComponent<CommitPanelProps> = (
  props
): React.ReactElement => {
  const { viewRef, showView, setShowView } = useCollapsibleView()
  const showOrHideView = useCallback((): void => {
    const {
      editor: { documentHasChanged },
    } = props
    if (documentHasChanged) {
      setShowView((prevState: boolean): boolean => !prevState)
    }
  }, [props.editor.documentHasChanged])

  const {
    editor: {
      documentHasChanged,
      currentCommitDescription: commitDescription,
      spec,
      currentSpecSHA,
      isCommitting,
    },
  } = props

  const extraClasses = !documentHasChanged ? 'disabled' : ''
  return (
    <>
      <div
        className={`App-BackgroundLayer ${
          documentHasChanged && showView ? 'visible' : ''
        }`}
      />
      <div className={`App-CommitPanel`} ref={viewRef}>
        <button
          className={`App-button App-tooltip-container ${extraClasses}`}
          onClick={showOrHideView}
          disabled={!documentHasChanged}
        >
          <i className="App-CommitPanel-Icon far fa-code-commit" />
          <Tooltip text={'Commit changes'} />
        </button>
        <CommitView
          show={showView && documentHasChanged}
          commitChanges={props.commitChanges}
          commitDescription={commitDescription}
          spec={spec}
          currentSpecSHA={currentSpecSHA}
          isCommitting={isCommitting}
          setCurrentCommitDescription={props.setCurrentCommitDescription}
        />
      </div>
    </>
  )
}

export default CommitPanel
