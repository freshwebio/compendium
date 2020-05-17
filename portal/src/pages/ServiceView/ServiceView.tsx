import React, { FunctionComponent, useEffect, useState } from 'react'
import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'

import { loadServiceDefinition } from 'services/github'
import LoadingScreen from 'components/LoadingScreen'
import Sidebar from 'components/Sidebar'
import ServiceViewStyles, { SwaggerUIWrapper } from './serviceView.styles'

export interface ServiceMatch {
  params: { service: string }
}

interface Props {
  match: ServiceMatch
  demoMode: boolean
  isLoading: boolean
}

const ServiceView: FunctionComponent<Props> = ({
  match,
  demoMode,
  isLoading,
}: Props): React.ReactElement => {
  const [spec, setSpec] = useState('')

  useEffect((): void => {
    loadServiceDefinition(match.params.service, 'master', demoMode)
      .then((result: { content: string; sha: string }): void => {
        setSpec(result.content)
      })
      .catch((err): void => console.log(err))
  }, [match.params.service])

  return (
    <>
      {isLoading || !spec ? <LoadingScreen /> : <Sidebar demoMode={demoMode} />}
      <ServiceViewStyles />
      <SwaggerUIWrapper>
        <SwaggerUI
          spec={spec}
          docExpansion="list"
          supportedSubmitMethods={[
            'get',
            'put',
            'post',
            'delete',
            'options',
            'head',
            'patch',
            'trace',
          ]}
        />
      </SwaggerUIWrapper>
    </>
  )
}

export default ServiceView
