import { css, FlattenSimpleInterpolation } from 'styled-components'

export interface TouchTextSystemProps {
  theme: any
  styleName: string
}

export interface TouchTextSystemFunction {
  (_: TouchTextSystemProps): FlattenSimpleInterpolation
}

interface PropertyScaleConfig {
  property: string
  scale?: string
}

export interface TouchTextSystemConfig {
  extraStylesProp: string
  fontSize: PropertyScaleConfig
  lineHeight: PropertyScaleConfig
}

export const touchTextSystem = (
  config: TouchTextSystemConfig
): TouchTextSystemFunction => {
  return (props: TouchTextSystemProps): FlattenSimpleInterpolation => {
    const theme = props.theme
    const styleName = props.styleName

    const mqTouchKeys = Object.keys(theme.mediaQueries).filter(mqName =>
      mqName.toLowerCase().endsWith('touch')
    )
    const fontSizeScale =
      config.fontSize.scale && theme[config.fontSize.scale]
        ? theme[config.fontSize.scale]
        : []
    const lineHeightScale =
      config.lineHeight.scale && theme[config.lineHeight.scale]
        ? theme[config.lineHeight.scale]
        : []
    const extraStyle = theme[config.extraStylesProp][styleName]

    return css`
      ${mqTouchKeys.map(key => {
        const fsValue = extraStyle[config.fontSize.property][key]
        const lhValue = extraStyle[config.lineHeight.property][key]
        const finalFSValue =
          fontSizeScale.length > 0 ? fontSizeScale[fsValue] : fsValue
        const finalLHValue =
          lineHeightScale.length > 0 ? lineHeightScale[lhValue] : lhValue
        // Only supporting pixels as values for now.
        return css`
          ${theme.mediaQueries[key]} and (pointer: coarse) {
            font-size: ${(finalFSValue + '').endsWith('px')
              ? finalFSValue
              : `${finalFSValue}px`};
            line-height: ${(finalLHValue + '').endsWith('px')
              ? finalLHValue
              : `${finalLHValue}px`};
          }
        `
      })}
    `
  }
}
