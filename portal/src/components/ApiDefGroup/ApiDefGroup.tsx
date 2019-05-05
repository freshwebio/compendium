import React from 'react'

import ApiDefCard from '../ApiDefCard'
import { FileEntry } from 'services/github'
import { ApiDefGroupWrapper, CardsWrapper, Heading } from './apiDefGroup.styles'

interface ApiDefGroupProps {
  group: string
  definitions: FileEntry[]
}

const ApiDefGroup: React.FunctionComponent<ApiDefGroupProps> = (
  props
): React.ReactElement => {
  return (
    <ApiDefGroupWrapper>
      <Heading>{props.group}</Heading>
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
