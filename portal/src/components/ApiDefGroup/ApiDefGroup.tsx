import React from 'react'

import ApiDefCard from '../ApiDefCard'
import { FileEntry } from 'services/github'
import {
  ApiDefGroupWrapper,
  CardsWrapper,
  Heading,
  AddServiceWrapper,
} from './apiDefGroup.styles'
import InlineAddField from 'components/InlineAddField'

interface ApiDefGroupProps {
  group: string
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
            onSave={(): void => {}}
            iconColour={'white'}
            finished={false}
          />
        </AddServiceWrapper>
      </Heading>
      <CardsWrapper>
        {props.definitions.map(
          (definition: any, index: number): React.ReactElement => {
            return <ApiDefCard key={definition.path} definition={definition} />
          }
        )}
      </CardsWrapper>
    </ApiDefGroupWrapper>
  )
}

export default ApiDefGroup
