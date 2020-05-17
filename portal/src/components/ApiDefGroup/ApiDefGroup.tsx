import React, { useContext, useState, useRef, useEffect } from 'react'
import { ThemeContext } from 'styled-components'

import ApiDefCard from '../ApiDefCard'
import { FileEntry } from 'services/github'
import {
  ApiDefGroupWrapper,
  CardsWrapper,
  Heading,
  AddServiceWrapper,
  TextWrapper,
  GroupActionsWrapper,
  GroupText,
} from './apiDefGroup.styles'
import InlineAddField from 'components/InlineAddField'
import { EntitiesState } from 'appredux/reducers/entities'

import content from 'content.json'
import IconButton from 'components/IconButton'
import { ApydoxTheme } from 'styles/themes/apydoxv1'

interface ApiDefGroupProps {
  group: string
  groupId: string
  entities: EntitiesState
  addService: (groupPath: string, serviceNameInput: string) => void
  definitions: FileEntry[]
}

const ApiDefGroup: React.FunctionComponent<ApiDefGroupProps> = (
  props
): React.ReactElement => {
  const theme: ApydoxTheme = useContext(ThemeContext)
  const [editGroupMode, setEditGroupMode] = useState(false)
  const groupTextRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (editGroupMode && groupTextRef.current) {
      groupTextRef.current.focus()
    }
  }, [editGroupMode])

  const editGroup = () => {
    setEditGroupMode(true)
  }

  const renderEditGroupActions = () => {
    return (
      <>
        <IconButton
          colour={'#67c200'}
          iconClassName="fas fa-check"
          iconFontSize={'11pt'}
        />
        <IconButton
          colour={'#ff3333'}
          iconClassName="fas fa-times"
          iconFontSize={'11pt'}
        />
      </>
    )
  }

  const renderViewGroupActions = () => {
    return (
      <>
        <IconButton
          iconClassName={'fas fa-pen'}
          colour={'white'}
          onClick={editGroup}
        />
        <IconButton iconClassName={'fas fa-trash'} colour={theme.colours.red} />
      </>
    )
  }

  return (
    <ApiDefGroupWrapper>
      <Heading>
        <GroupText
          editGroupMode={editGroupMode}
          contentEditable={editGroupMode}
          ref={groupTextRef}
        >
          {props.group}
        </GroupText>
        <GroupActionsWrapper>
          {editGroupMode ? renderEditGroupActions() : renderViewGroupActions()}
        </GroupActionsWrapper>
        <AddServiceWrapper>
          <InlineAddField
            entityName={'service'}
            alignment={'right'}
            onSave={(serviceInput: string): void => {
              props.addService(props.groupId, serviceInput)
            }}
            iconColour={'white'}
            finished={!props.entities.addingServiceStates[props.groupId]}
          />
        </AddServiceWrapper>
      </Heading>
      {props.definitions.length > 0 ? (
        <CardsWrapper>
          {props.definitions.map(
            (definition: any, index: number): React.ReactElement => {
              return (
                <ApiDefCard key={definition.path} definition={definition} />
              )
            }
          )}
        </CardsWrapper>
      ) : (
        content.dashboard.emptyGroupText.map(
          (line, index): React.ReactElement => (
            <TextWrapper key={line.charAt(0) + index}>{line}</TextWrapper>
          )
        )
      )}
    </ApiDefGroupWrapper>
  )
}

export default ApiDefGroup
