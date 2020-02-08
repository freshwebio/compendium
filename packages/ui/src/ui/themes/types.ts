export interface ApydoxThemeTextStyles {
  [name: string]: any
}

export interface ApydoxThemeGreyScaleColours {
  white: string
  onWhite: string
  lightGrey: string
  grey: string
  onGrey: string
  black: string
  onBlack: string
}

export interface ApydoxThemeFeedbackColours {
  green: string
  onGreen: string
  greenP20: string
  onGreenP20: string
  greenP60: string
  onGreenP60: string
  red: string
  onRed: string
  redP20: string
  onRedP20: string
  redP60: string
  onRedP60: string
}

export type ApydoxThemeColours = {
  [colour: string]: string
  primary: string
  onPrimary: string
  primaryM30: string
  onPrimaryM30: string
  primaryM60: string
  onPrimaryM60: string
  primaryP30: string
  onPrimaryP30: string
  primaryP60: string
  onPrimaryP60: string
  secondary: string
  onSecondary: string
  secondaryP20: string
  onSecondaryP20: string
  secondaryP60: string
  onSecondaryP60: string
  secondaryDark: string
  tertiary: string
  onTertiary: string
  tertiaryP20: string
  onTertiaryP20: string
  tertiaryP60: string
  onTertiaryP60: string
} & ApydoxThemeGreyScaleColours &
  ApydoxThemeFeedbackColours

export interface ApydoxTheme {
  name: string
  backgroundColour: string
  backgroundColourLight: string
  backgroundColourLighter: string
  foregroundColour: string
  colours: ApydoxThemeColours
  textStyles: ApydoxThemeTextStyles
  extraTextStyles: ApydoxThemeTextStyles
  fontSizes: number[]
  breakpoints: string[]
  mediaQueries: { [name: string]: string }
}
