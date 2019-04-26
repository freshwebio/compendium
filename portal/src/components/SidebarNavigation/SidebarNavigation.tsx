import React from 'react'

import './SidebarNavigation.scss'
import { Link, withRouter } from 'react-router-dom'
import { removeFileExt } from '../../utils/files'

class SidebarNavigation extends React.Component<any, any> {
  render() {
    const {
      match: { params },
    } = this.props
    return (
      <ul className="SidebarNavigation">
        {this.props.groups.map((group: any, index: number) => {
          return (
            <li key={group.id} className="Madswagger-nav-group">
              <div className="Madswagger-nav-heading">{group.name}</div>
              <ul className="Madswagger-nav-definitions">
                {group.definitions.map((definition: any) => {
                  const parts = definition.path.split('/')
                  const groupPrefix =
                    parts.length >= 2 ? `${parts[parts.length - 2]}::` : ''
                  const service = removeFileExt(parts[parts.length - 1])
                  const serviceId = `${groupPrefix}${service}`
                  const classes =
                    serviceId === params.service
                      ? 'Madswagger-nav-item active'
                      : 'Madswagger-nav-item'
                  return (
                    <li key={definition.path} className={classes}>
                      <Link to={`/edit/${serviceId}`}>{service}</Link>
                    </li>
                  )
                })}
              </ul>
            </li>
          )
        })}
      </ul>
    )
  }
}

export default withRouter(SidebarNavigation)
