import React from 'react'
import { Link } from 'react-router-dom'

import './ApiDefCard.scss'
import { removeFileExt } from '../../utils/files'

class ApiDefCard extends React.Component<any, any> {
  render() {
    const { definition } = this.props
    const parts = definition.path.split('/')
    const groupPrefix = parts.length >= 2 ? `${parts[parts.length - 2]}::` : ''
    const service = removeFileExt(parts[parts.length - 1])
    return (
      <Link className="ApiDefCard" to={`/edit/${groupPrefix}${service}`}>
        <div className="text">{service}</div>
      </Link>
    )
  }
}

export default ApiDefCard
