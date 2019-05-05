import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router'

import { getApiDefs } from 'services/github'
import SidebarNavigation from 'components/SidebarNavigation'
import useCollapsibleView from 'hooks/useCollapsibleView'
import { SidebarWrapper, CaretIcon } from './sidebar.styles'

const Sidebar: React.FunctionComponent<any> = ({
  match,
}): React.ReactElement => {
  const [apiDefinitionGroups, setApiDefinitionGroups] = useState<any[]>([])
  const { viewRef, showView, setShowView } = useCollapsibleView()

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

  const caretDirection = showView ? 'left' : 'right'
  return (
    <SidebarWrapper visible={showView} ref={viewRef}>
      <CaretIcon
        className={`fas fa-caret-${caretDirection}`}
        onClick={(): void => {
          setShowView((prevState: boolean): boolean => !prevState)
        }}
      />
      <SidebarNavigation groups={apiDefinitionGroups} />
    </SidebarWrapper>
  )
}

export default withRouter(Sidebar)
