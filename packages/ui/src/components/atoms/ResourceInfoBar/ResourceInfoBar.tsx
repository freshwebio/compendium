import React from 'react'

import {
  ResourceInfoBarContainer,
  LeadingContainer,
  CentreContainer,
  TrailingContainer,
} from './resourceInfoBar.styled'
import { ResourceInfoBarColourScheme } from './colourScheme'

export interface ResourceInfoBarProps {
  leading: React.ReactElement
  centre?: React.ReactElement
  trailing: React.ReactElement
  colourScheme: ResourceInfoBarColourScheme
  hideOverflow?: boolean
}

const ResourceInfoBar: React.FunctionComponent<ResourceInfoBarProps> = ({
  leading,
  centre,
  trailing,
  colourScheme,
  hideOverflow,
}): React.ReactElement => (
  <ResourceInfoBarContainer colourScheme={colourScheme}>
    <LeadingContainer colourScheme={colourScheme} includesCentre={!!centre}>
      {leading}
    </LeadingContainer>
    {centre && (
      <CentreContainer colourScheme={colourScheme} hideOverflow={hideOverflow}>
        {centre}
      </CentreContainer>
    )}
    <TrailingContainer colourScheme={colourScheme}>
      {trailing}
    </TrailingContainer>
  </ResourceInfoBarContainer>
)

ResourceInfoBar.defaultProps = {
  colourScheme: ResourceInfoBarColourScheme.Primary,
}

export default ResourceInfoBar
