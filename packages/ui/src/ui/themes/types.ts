export interface ApydoxThemeTextStyles {
  [name: string]: any
}

export interface ApydoxThemeGreyScaleColours {
  white: string
  onWhite: string
  grey: string
  onGrey: string
  black: string
  onBlack: string
}

export interface ApydoxThemeIndicitaveColours {
  green: string
  onGreen: string
  red: string
  onRed: string
}

export interface ApydoxThemeColours {
  primary: string
  onPrimary: string
  primaryDark: string
  onPrimaryDark: string
  primaryLight: string
  onPrimaryLight: string
  secondary: string
  onSecondary: string
  secondaryLight: string
  onSecondaryLight: string
  tertiary: string
  onTertiary: string
  tertiaryLight: string
  onTertiaryLight: string
  tertiaryDark: string
  onTertiaryDark: string
  quaternary: string
  onQuaternary: string
  quinary: string
  onQuinary: string
  greyScale: ApydoxThemeGreyScaleColours
  indicitave: ApydoxThemeIndicitaveColours
}

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
