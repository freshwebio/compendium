import React, { useCallback } from 'react'

import Tooltip from 'components/Tooltip'
import CommitView from 'components/CommitView'
import { EditorState } from 'appredux/reducers/editor'
import useCollapsibleView from 'hooks/useCollapsibleView'
import { CommitPanelWrapper } from './commitPanel.styles'
import IconButton from 'components/IconButton'
import BackgroundLayer from 'components/BackgroundLayer'

export interface CommitPanelProps {
  editor: EditorState
  commitChanges: () => void
  setCurrentCommitDescription: () => void
}

const CommitPanel: React.FunctionComponent<CommitPanelProps> = (
  props
): React.ReactElement => {
  const { viewRef, showView, setShowView } = useCollapsibleView()
  const showOrHideView = useCallback((): void => {
    // Given the disabled state of the icon button we don't need to check
    // whether or not the document has changed, as the click event won't fire
    // if the document hasn't changed.
    setShowView((prevState: boolean): boolean => !prevState)
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

  return (
    <>
      <BackgroundLayer visible={showView} />
      <CommitPanelWrapper ref={viewRef}>
        <IconButton
          onClick={showOrHideView}
          disabled={!documentHasChanged}
          isTooltipContainer
          iconClassName="far fa-code-commit"
          colour="white"
          iconFontSize="21pt"
        >
          <Tooltip text={'Commit changes'} />
        </IconButton>
        <CommitView
          show={showView && documentHasChanged}
          commitChanges={props.commitChanges}
          commitDescription={commitDescription}
          spec={spec}
          currentSpecSHA={currentSpecSHA}
          isCommitting={isCommitting}
          setCurrentCommitDescription={props.setCurrentCommitDescription}
        />
      </CommitPanelWrapper>
    </>
  )
}

export default CommitPanel
