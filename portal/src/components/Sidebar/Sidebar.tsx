import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router'

import { getApiDefs } from 'services/github'
import SidebarNavigation from 'components/SidebarNavigation'
import { SidebarWrapper, ListIcon } from './sidebar.styles'

const Sidebar: React.FunctionComponent<any> = ({
  match,
}): React.ReactElement => {
  const [apiDefinitionGroups, setApiDefinitionGroups] = useState<any[]>([])
  const [showView, setShowView] = useState<boolean>(false)

  useEffect((): void => {
    const loadApiDefs = async (): Promise<void> => {
      try {
        const apiDefs = await getApiDefs()
        setApiDefinitionGroups(apiDefs)
      } catch (err) {
        console.log(err)
      }
    }
    loadApiDefs()
  }, [setApiDefinitionGroups])

  useEffect((): void => {
    const { params } = match
    // Hide the sidebar if we have navigated to the editor view to a service.
    if (params.service) {
      setShowView(false)
    }
  }, [match.params])

  return (
    <SidebarWrapper
      visible={showView}
      onMouseEnter={(): void => setShowView(true)}
      onMouseLeave={(): void => setShowView(false)}
    >
      <ListIcon visible={showView} className={`far fa-list-ul`} />
      <SidebarNavigation groups={apiDefinitionGroups} />
    </SidebarWrapper>
  )
}

export default withRouter(Sidebar)
