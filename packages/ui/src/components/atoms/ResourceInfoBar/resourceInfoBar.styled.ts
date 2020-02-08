import styled, {
  css,
  FlattenSimpleInterpolation,
  ThemedStyledProps,
} from 'styled-components'
import { ApydoxTheme } from '@ui/themes/types'
import {
  ResourceInfoBarColourScheme,
  colourSchemeMapping,
} from './colourScheme'

export type ResourceInfoBarContainerProps = ThemedStyledProps<
  any,
  ApydoxTheme
> & {
  colourScheme: ResourceInfoBarColourScheme
}

export const ResourceInfoBarContainer = styled('div')<{
  colourScheme: ResourceInfoBarColourScheme
}>`
  ${({ theme, colourScheme }): FlattenSimpleInterpolation => css`
    display: flex;
    justify-content: space-between;
    align-content: center;
    height: 42px;
    background-color: ${theme.colours[
      colourSchemeMapping[colourScheme].mainBackground
    ]};
    border: 1px solid
      ${theme.colours[colourSchemeMapping[colourScheme].mainBorder]};
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
  `}
`

export const LeadingContainer = styled('div')<{
  colourScheme: ResourceInfoBarColourScheme
  includesCentre: boolean
}>`
  ${({ theme, colourScheme, includesCentre }): FlattenSimpleInterpolation =>
    css`
      padding: 10px 20px;
      color: ${theme.colours[
        colourSchemeMapping[colourScheme].leadingForeground
      ]};
      background-color: ${theme.colours[
        colourSchemeMapping[colourScheme].leadingBackground
      ]};
      flex: ${includesCentre ? 2 : 1};
    `}
`

export const CentreContainer = styled('div')<{
  colourScheme: ResourceInfoBarColourScheme
  hideOverflow?: boolean
}>`
  padding: 10px 20px;
  overflow: ${({ hideOverflow }): string => (hideOverflow ? 'hidden' : 'auto')};
  color: ${({ theme, colourScheme }): string =>
    theme.colours[colourSchemeMapping[colourScheme].mainForeground]};
`

export const TrailingContainer = styled('div')<{
  colourScheme: ResourceInfoBarColourScheme
}>`
  ${({ theme, colourScheme }): FlattenSimpleInterpolation =>
    css`
      padding: 10px 20px;
      color: ${theme.colours[
        colourSchemeMapping[colourScheme].trailingForeground
      ]};
      background-color: ${theme.colours[
        colourSchemeMapping[colourScheme].trailingBackground
      ]};
    `}
`
