import React from 'react'

import ApiDefCard from '../ApiDefCard'
import { FileEntry } from 'services/github'
import {
  ApiDefGroupWrapper,
  CardsWrapper,
  Heading,
  AddServiceWrapper,
  TextWrapper,
} from './apiDefGroup.styles'
import InlineAddField from 'components/InlineAddField'
import { EntitiesState } from 'appredux/reducers/entities'

import content from 'content.json'

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
  return (
    <ApiDefGroupWrapper>
      <Heading>
        {props.group}
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
