import React from 'react'

import { removeFileExt } from 'utils/files'
import { ApiDefCardLink, ApiDefCardText } from './apiDefCard.styles'

interface ApiDefCardProps {
  definition: { path: string }
}

const ApiDefCard: React.FunctionComponent<ApiDefCardProps> = (
  props
): React.ReactElement => {
  const { definition } = props
  const parts = definition.path.split('/')
  const groupPrefix = parts.length >= 2 ? `${parts[parts.length - 2]}::` : ''
  const service = removeFileExt(parts[parts.length - 1])
  return (
    <ApiDefCardLink to={`/edit/${groupPrefix}${service}`}>
      <ApiDefCardText>{service}</ApiDefCardText>
    </ApiDefCardLink>
  )
}

export default ApiDefCard
