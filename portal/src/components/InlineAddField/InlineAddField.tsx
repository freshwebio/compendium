import React, { useState, useRef, useEffect } from 'react'
import IconButton from 'components/IconButton'

import useCollapsibleView from 'hooks/useCollapsibleView'

import {
  AddCTAWrapper,
  AddInputWrapper,
  AddInput,
  InlineAddWrapper,
  LoadingImage,
} from './inlineAddField.styles'
import loader from 'assets/images/loader.svg'

interface InlineAddFieldProps {
  entityName: string
  iconColour: string
  alignment: string
  finished: boolean
  onSave: (_: string) => void
}

const InlineAddField: React.FunctionComponent<InlineAddFieldProps> = ({
  entityName,
  iconColour,
  alignment,
  finished,
  onSave,
}): React.ReactElement => {
  const [text, setText] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)
  const {
    viewRef,
    showView,
    setShowView,
    blockingState: saving,
    setBlockingState: setSaving,
  } = useCollapsibleView<HTMLDivElement>()

  useEffect((): void => {
    // If the data from this field was saving and has finished
    // ensure we update the saving/blocking state.
    if (finished) {
      setShowView(false)
    }
  }, [finished])

  useEffect((): void => {
    // If we are no longer showing the view and have finished
    // saving then clear the blocking state.
    if (!showView && finished) {
      // Add a timeout to ensure the field slides out of display before resetting
      // the text and showing the saving state.
      setTimeout((): void => setSaving(false), 450)
    }
  }, [showView, finished])

  useEffect((): void => {
    // Once we know our field is no longer being saved
    // go ahead and clear it's text.
    if (!saving) {
      setText('')
    }
  }, [saving])

  return (
    <InlineAddWrapper>
      <AddCTAWrapper
        alignment={alignment}
        visible={!showView}
        onClick={(): void => {
          setShowView(true)
          if (inputRef.current) {
            inputRef.current.focus()
          }
        }}
      >
        <IconButton
          onClick={(): void => {}}
          colour={iconColour}
          iconClassName={'fas fa-plus'}
        />
        {entityName}
      </AddCTAWrapper>
      <AddInputWrapper alignment={alignment} visible={showView} ref={viewRef}>
        <AddInput
          ref={inputRef}
          value={text}
          placeholder={`${entityName} name`}
          onChange={(evt): void => setText(evt.target.value)}
        />
        {saving ? (
          <LoadingImage src={loader} alt={`Saving ${entityName}`} width={24} />
        ) : (
          <>
            <IconButton
              onClick={(): void => {
                if (text !== '') {
                  onSave(text)
                  setSaving(true)
                }
              }}
              disabled={text === ''}
              colour={'#67c200'}
              iconClassName="fas fa-check"
              iconFontSize={'11pt'}
            />
            <IconButton
              onClick={(): void => {
                setShowView(false)
                setText('')
              }}
              colour={'#ff3333'}
              iconClassName="fas fa-times"
              iconFontSize={'11pt'}
            />
          </>
        )}
      </AddInputWrapper>
    </InlineAddWrapper>
  )
}

export default InlineAddField
