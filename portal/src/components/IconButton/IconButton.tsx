import React from 'react'

import { StyledIconButton, StyledIcon } from './iconButton.styles'

interface IconButtonProps {
  onClick: (evt: any) => void
  iconClassName: string
  isTooltipContainer?: boolean
  disabled?: boolean
  colour?: string
  iconFontSize?: string
}

/**
 * IconButton provides a button component that is soley an icon with support for a tooltip.
 * You should use class names from icon providers such as fontawesome to determine which icon will
 * be displayed.
 */
const IconButton: React.FunctionComponent<IconButtonProps> = ({
  iconClassName,
  isTooltipContainer,
  onClick,
  disabled,
  colour,
  iconFontSize,
  children,
}): React.ReactElement => {
  return (
    <StyledIconButton
      isTooltipContainer={isTooltipContainer}
      onClick={onClick}
      disabled={disabled}
    >
      <StyledIcon
        className={iconClassName}
        colour={colour}
        iconFontSize={iconFontSize}
        disabled={disabled}
      />
      {children}
    </StyledIconButton>
  )
}

export default IconButton
