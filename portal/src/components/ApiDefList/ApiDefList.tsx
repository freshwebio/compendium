import React, { useState, useEffect } from 'react'
import { getApiDefs, ApiDefinitionGroup } from 'services/github'
import ApiDefGroup from 'components/ApiDefGroup'
import { ApiDefListWrapper, LoadingImageStyled } from './apiDefList.styles'

import Loader from 'assets/images/loader.svg'

interface ApiDefListProps {
  finishedSaving: boolean
}

const ApiDefList: React.FunctionComponent<ApiDefListProps> = ({
  finishedSaving,
}): React.ReactElement => {
  const [apiDefinitionGroups, setApiDefinitionGroups] = useState<
    ApiDefinitionGroup[] | null
  >(null)
  // Whenever we are in a state where we have finished saving new entities,
  // refresh the dashboard view.
  useEffect((): void => {
    if (finishedSaving) {
      getApiDefs()
        .then(
          (apiDefs: ApiDefinitionGroup[]): void => {
            setApiDefinitionGroups(apiDefs)
          }
        )
        .catch((err: any): void => console.log(err))
    }
  }, [finishedSaving])

  return (
    <ApiDefListWrapper>
      {apiDefinitionGroups ? (
        apiDefinitionGroups.map(
          (group: ApiDefinitionGroup, index: number): React.ReactElement => {
            return (
              <ApiDefGroup
                key={index}
                group={group.name}
                groupId={group.id}
                definitions={group.definitions}
              />
            )
          }
        )
      ) : (
        <LoadingImageStyled src={Loader} alt="Loading API definition groups" />
      )}
    </ApiDefListWrapper>
  )
}

export default ApiDefList
