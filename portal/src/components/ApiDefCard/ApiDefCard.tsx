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
  // Remove hyphen and underscore for presentational purposes.
  const service = removeFileExt(parts[parts.length - 1])
  const serviceLabel = service.replace(/-|_/g, ' ')
  return (
    <ApiDefCardLink to={`/edit/${groupPrefix}${service}`}>
      <ApiDefCardText>{serviceLabel}</ApiDefCardText>
    </ApiDefCardLink>
  )
}

export default ApiDefCard
