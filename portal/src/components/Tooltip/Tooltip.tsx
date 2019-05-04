import React from 'react'

import { StyledTooltip } from './tooltip.styles'

interface TooltipProps {
  text: string
}

const Tooltip: React.FunctionComponent<TooltipProps> = ({
  text,
}): React.ReactElement => {
  return <StyledTooltip>{text}</StyledTooltip>
}

export default Tooltip
