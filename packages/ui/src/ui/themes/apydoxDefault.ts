import { ApydoxTheme } from './types'

const fontFamilies = {
  default: 'Lato, sans-serif',
  headings: 'Roboto Slab, serif',
}

const breakpoints = ['319px', '599px']

const apydoxDefault: ApydoxTheme = {
  name: 'apydox default theme',
  // Old names, keep around while transitioning.
  backgroundColour: '#1e1e1e',
  foregroundColour: '#fefefe',
  backgroundColourLight: '#414141',
  backgroundColourLighter: '#5b5b5b',
  // New theme structure.
  colours: {
    primary: '#0471DE',
    onPrimary: '#FEFEFE',
    primaryM60: '#012D58',
    onPrimaryM60: '#FFFFFF',
    primaryM30: '#024E9A',
    onPrimaryM30: '#FEFEFE',
    primaryP30: '#4F9BE7',
    onPrimaryP30: '#1C1B25',
    primaryP60: '#9AC6F1',
    onPrimaryP60: '#1C1B25',
    secondary: '#B07004',
    onSecondary: '#FEFEFE',
    secondaryP20: '#BF8C36',
    onSecondaryP20: '#FEFEFE',
    secondaryP60: '#E4C494',
    onSecondaryP60: '#1C1B25',
    secondaryDark: '#7A4E02',
    tertiary: '#1915AB',
    onTertiary: '#FEFEFE',
    tertiaryP20: '#4A3EC2',
    onTertiaryP20: '#FEFEFE',
    tertiaryP60: '#A4A0E2',
    onTertiaryP60: '#1C1B25',
    green: '#1F573D',
    onGreen: '#FEFEFE',
    greenP20: '#4B7863',
    onGreenP20: '#FFFFFF',
    greenP60: '#A5BBB1',
    onGreenP60: '#1C1B25',
    red: '#8F2424',
    onRed: '#FEFEFE',
    redP20: '#A54F4F',
    onRedP20: '#FFFFFF',
    redP60: '#D2A7A7',
    onRedP60: '#1C1B25',
    white: '#F1F1F1',
    lightGrey: '#E9E9E9',
    onWhite: '#1C1B25',
    grey: '#737373',
    onGrey: '#FFFFFF',
    black: '#1F2327',
    onBlack: '#FEFEFE',
  },
  textStyles: {
    canon: {
      as: 'h1',
      fontSize: [11, 12, 14],
      lineHeight: ['32px', '36px', '48px'],
      fontFamily: fontFamilies.headings,
    },
    trafalgar: {
      as: 'h1',
      fontSize: [6, 9, 12],
      lineHeight: ['24px', '28px', '36px'],
      fontFamily: fontFamilies.headings,
    },
    paragon: {
      as: 'h2',
      fontSize: [6, 8, 11],
      fontWeight: 500,
      fontFamily: fontFamilies.headings,
      lineHeight: ['24px', '26px', '32px'],
    },
    doublePica: {
      fontSize: [6, 6, 9],
      fontWeight: 400,
      fontFamily: fontFamilies.default,
      lineHeight: ['24px', '24px', '28px'],
    },
    greatPrimer: {
      as: 'h3',
      fontWeight: 400,
      fontSize: [5, 5, 6],
      fontFamily: fontFamilies.headings,
      lineHeight: ['22px', '22px', '24px'],
    },
    bodyCopy: {
      as: 'p',
      fontSize: [3, 4, 4],
      fontFamily: fontFamilies.default,
      lineHeight: ['20px', '22px', '22px'],
    },
    pica: {
      fontSize: [3, 4, 4],
      fontFamily: fontFamilies.default,
      lineHeight: ['20px', '20px', '20px'],
    },
    picaSerif: {
      fontSize: [3, 4, 4],
      fontFamily: fontFamilies.headings,
      lineHeight: ['20px', '20px', '20px'],
    },
    longPrimer: {
      fontSize: [3, 3, 2],
      fontFamily: fontFamilies.default,
      lineHeight: ['18px', '18px', '18px'],
    },
    brevier: {
      fontSize: [2, 2, 1],
      fontFamily: fontFamilies.default,
      lineHeight: ['16px', '18px', '16px'],
    },
    minion: {
      fontSize: [0, 0, 0],
      fontFamily: fontFamilies.default,
      lineHeight: ['16px', '16px', '16px'],
      textTransform: 'uppercase',
    },
  },
  extraTextStyles: {
    canon: {
      fontSize: { mdTouch: 15 },
      lineHeight: { mdTouch: '56px' },
    },
    trafalgar: {
      fontSize: { mdTouch: 13 },
      lineHeight: { mdTouch: '40px' },
    },
    paragon: {
      fontSize: { mdTouch: 11 },
      lineHeight: { mdTouch: '32px' },
    },
    doublePica: {
      fontSize: { mdTouch: 10 },
      lineHeight: { mdTouch: '30px' },
    },
    greatPrimer: {
      fontSize: { mdTouch: 7 },
      lineHeight: { mdTouch: '24px' },
    },
    bodyCopy: {
      fontSize: { mdTouch: 5 },
      lineHeight: { mdTouch: '24px' },
    },
    pica: {
      fontSize: { mdTouch: 5 },
      lineHeight: { mdTouch: '22px' },
    },
    picaSerif: {
      fontSize: { mdTouch: 5 },
      lineHeight: { mdTouch: '22px' },
    },
    longPrimer: {
      fontSize: { mdTouch: 3 },
      lineHeight: { mdTouch: '20px' },
    },
    brevier: {
      fontSize: { mdTouch: 2 },
      lineHeight: { mdTouch: '18px' },
    },
    minion: {
      fontSize: { mdTouch: 1 },
      lineHeight: { mdTouch: '16px' },
    },
  },
  fontSizes: [12, 13, 14, 15, 16, 18, 20, 21, 22, 24, 26, 28, 32, 36, 44, 52],
  breakpoints,
  mediaQueries: {
    sm: `@media screen and (min-width: ${breakpoints[0]})`,
    mdTouch: `@media screen and (min-width: ${breakpoints[1]})`,
    md: `@media screen and (min-width: ${breakpoints[1]})`,
  },
}

export default apydoxDefault
