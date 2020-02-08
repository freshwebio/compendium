import styled, { css, FlattenSimpleInterpolation } from 'styled-components'

import { system } from 'styled-system'

import { touchTextSystem, TouchTextSystemProps } from '@utils/touchTextSystem'

export interface DynamicComponentProps {
  ellipsis?: boolean
}

export default styled('div')<TouchTextSystemProps & DynamicComponentProps>`
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
  ${({ ellipsis }): FlattenSimpleInterpolation | string =>
    ellipsis
      ? css`
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        `
      : ''}
`
