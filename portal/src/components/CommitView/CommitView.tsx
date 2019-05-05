import React, { useCallback } from 'react'

import {
  CommitViewWrapper,
  CentredImage,
  CommitViewLabel,
  CommitViewTextArea,
  CommitViewButton,
  AsteriskWrapper,
} from './commitView.styles'
import Loader from 'assets/images/loaderlight.svg'

interface CommitViewProps {
  commitDescription: string
  spec: string
  currentSpecSHA: string
  show: boolean
  isCommitting: boolean
  setCurrentCommitDescription: (description: string) => void
  commitChanges: (
    commitDescription: string,
    spec: string,
    currentSpecSHA: string
  ) => void
}

const CommitView: React.FunctionComponent<CommitViewProps> = ({
  commitDescription,
  commitChanges,
  spec,
  currentSpecSHA,
  show,
  isCommitting,
  setCurrentCommitDescription,
}): React.ReactElement => {
  const updateCommitDescription = useCallback(
    (evt: any): void => {
      if (setCurrentCommitDescription) {
        setCurrentCommitDescription(evt.target.value)
      }
    },
    [setCurrentCommitDescription]
  )

  const checkAndCommitChanges = useCallback(
    (evt: any): void => {
      if (commitChanges) {
        commitChanges(commitDescription, spec, currentSpecSHA)
      }
    },
    [commitChanges, commitDescription, spec, currentSpecSHA]
  )

  return (
    <CommitViewWrapper visible={show}>
      {isCommitting ? (
        <CentredImage src={Loader} alt="Committing changes" />
      ) : (
        <>
          <CommitViewLabel htmlFor="App-CommitView-CommitChanges">
            Describe your changes{' '}
            <AsteriskWrapper colour="rgb(236, 101, 101)">*</AsteriskWrapper>
          </CommitViewLabel>
          <CommitViewTextArea
            id="App-CommitView-CommitChanges"
            value={commitDescription}
            onChange={updateCommitDescription}
          />
          <CommitViewButton
            disabled={commitDescription.length === 0}
            onClick={checkAndCommitChanges}
          >
            Go on, commit
          </CommitViewButton>
        </>
      )}
    </CommitViewWrapper>
  )
}

export default CommitView
