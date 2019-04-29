import React from 'react'

import './ApiDefGroup.scss'
import ApiDefCard from '../ApiDefCard'
import { FileEntry } from 'services/github'
import { ApiDefGroupWrapper, CardsWrapper } from './apiDefGroup.styles'

interface ApiDefGroupProps {
  group: string
  definitions: FileEntry[]
}

const ApiDefGroup: React.FunctionComponent<ApiDefGroupProps> = (
  props
): React.ReactElement => {
  return (
    <ApiDefGroupWrapper>
      <h3 className="Madswagger-heading">{props.group}</h3>
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
