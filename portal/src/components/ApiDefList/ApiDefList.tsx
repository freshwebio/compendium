import React, { useState, useEffect } from 'react'
import { getApiDefs, ApiDefinitionGroup } from 'services/github'
import ApiDefGroup from 'components/ApiDefGroup'
import { ApiDefListWrapper } from './apiDefList.styles'

const ApiDefList: React.FunctionComponent<{}> = (): React.ReactElement => {
  const [apiDefinitionGroups, setApiDefinitionGroups] = useState<
    ApiDefinitionGroup[]
  >([])
  useEffect((): void => {
    getApiDefs()
      .then(
        (apiDefs: ApiDefinitionGroup[]): void => {
          setApiDefinitionGroups(apiDefs)
        }
      )
      .catch((err: any): void => console.log(err))
  }, [])

  return (
    <ApiDefListWrapper>
      {apiDefinitionGroups.map(
        (group: any, index: number): React.ReactElement => {
          return (
            <ApiDefGroup
              key={index}
              group={group.name}
              definitions={group.definitions}
            />
          )
        }
      )}
    </ApiDefListWrapper>
  )
}

export default ApiDefList
