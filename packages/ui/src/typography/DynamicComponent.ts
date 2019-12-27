import styled from 'styled-components'

import { system } from 'styled-system'

import { touchTextSystem } from '@utils/touchTextSystem'

export default styled.div`
  ${system({
    textTransform: true,
    fontFamily: true,
    fontSize: {
      property: 'fontSize',
      scale: 'fontSizes',
    },
    lineHeight: {
      property: 'lineHeight',
      scale: 'lineHeights',
    },
  })}
  ${touchTextSystem({
    extraStylesProp: 'extraTextStyles',
    fontSize: {
      property: 'fontSize',
      scale: 'fontSizes',
    },
    lineHeight: {
      property: 'lineHeight',
    },
  })}
`
