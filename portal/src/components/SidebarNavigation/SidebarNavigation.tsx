import React from 'react'

import { Link, withRouter } from 'react-router-dom'
import { removeFileExt } from 'utils/files'

import {
  NavWrapper,
  NavGroup,
  NavHeading,
  NavDefinitions,
  NavItem,
} from './sidebarNavigation.styles'

const SidebarNavigation: React.FunctionComponent<any> = ({
  match,
  groups,
  visible,
}): React.ReactElement => {
  const { params } = match
  return (
    <NavWrapper visible={visible}>
      {groups.map((group: any, index: number): React.ReactElement | null => {
        if (group.definitions.length === 0) {
          return null
        }

        return (
          <NavGroup key={group.id}>
            <NavHeading>{group.name}</NavHeading>
            <NavDefinitions>
              {group.definitions.map(
                (definition: any): React.ReactElement => {
                  const parts = definition.path.split('/')
                  const groupPrefix =
                    parts.length >= 2 ? `${parts[parts.length - 2]}::` : ''
                  const service = removeFileExt(parts[parts.length - 1])
                  const serviceId = `${groupPrefix}${service}`
                  return (
                    <NavItem
                      key={definition.path}
                      active={serviceId === params.service}
                    >
                      <Link to={`/view/${serviceId}`}>
                        {service.replace(/-|_/g, ' ')}
                      </Link>
                    </NavItem>
                  )
                }
              )}
            </NavDefinitions>
          </NavGroup>
        )
      })}
    </NavWrapper>
  )
}

export default withRouter(SidebarNavigation)
