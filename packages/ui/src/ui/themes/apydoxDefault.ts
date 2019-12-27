import { ApydoxTheme } from './types'

const fontFamilies = {
  default: 'Lato, sans-serif',
  headings: 'Roboto Slab, serif',
}

const reusedColours = {
  onPrimary: '#1c1b25',
  onPrimaryDark: '#ffffff',
  onSecondaryLight: '#0f0f13',
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
    ...reusedColours,
    primary: '#60affe',
    primaryDark: '#3e70a3',
    primaryLight: '#91c8ff',
    onPrimaryLight: reusedColours.onPrimary,
    secondary: '#4e4d64',
    onSecondary: reusedColours.onPrimaryDark,
    secondaryLight: '#a9a7d9',
    onSecondaryLight: reusedColours.onSecondaryLight,
    tertiary: '#3d39cc',
    onTertiary: reusedColours.onPrimaryDark,
    tertiaryLight: '#a19ff5',
    onTertiaryLight: reusedColours.onSecondaryLight,
    tertiaryDark: '#292782',
    onTertiaryDark: reusedColours.onPrimaryDark,
    quaternary: '#ffd0a1',
    onQuaternary: '#3b3a4c',
    quinary: '#8d4016',
    onQuinary: reusedColours.onPrimaryDark,
    greyScale: {
      white: '#fefefe',
      onWhite: reusedColours.onPrimary,
      grey: '#c4c4c4',
      onGrey: '#131315',
      black: '#1f2327',
      onBlack: reusedColours.onPrimaryDark,
    },
    indicitave: {
      green: '#1f573d',
      onGreen: reusedColours.onPrimaryDark,
      red: '#8f2424',
      onRed: reusedColours.onPrimaryDark,
    },
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
