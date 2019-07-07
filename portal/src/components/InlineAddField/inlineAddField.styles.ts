import styled, { css, FlattenSimpleInterpolation } from 'styled-components'
import { StyledIconButton } from 'components/IconButton/iconButton.styles'

const InlineAddWrapper = styled.div`
  position: relative;
  width: 200px;
  height: 20px;
`

const AddCTAWrapper = styled('div')<{ visible: boolean; alignment: string }>`
  position: absolute;
  top: 0;
  ${({ alignment }): FlattenSimpleInterpolation =>
    alignment === 'left'
      ? css`
          left: 0;
        `
      : css`
          right: 0;
        `}
  cursor: pointer;
  opacity: ${({ visible }): number => (visible ? 1 : 0)};
  transition: opacity 200ms ease-in-out 300ms;
`

const AddInput = styled.input`
  width: 100%;
  padding-left: 5px;
  padding-right: 50px;
  padding-bottom: 5px;
  font-family: 'Roboto Slab', sans-serif;
  font-size: 1rem;
  background: transparent;
  outline: none;
  border: none;
  border-bottom: 1px solid #959595;
  color: white;

  ::placeholder {
    color: #a5a5a5;
  }
`

const AddInputWrapper = styled('div')<{ visible: boolean; alignment: string }>`
  position: absolute;
  top: 0;
  ${({ alignment }): FlattenSimpleInterpolation =>
    alignment === 'left'
      ? css`
          left: 0;
        `
      : css`
          right: 0;
        `}

  width: ${({ visible }): string => (visible ? '100%' : '0')};
  overflow: hidden;
  transition: width 200ms ease-in-out 300ms;

  ${StyledIconButton} {
    position: absolute;

    &:nth-child(2) {
      right: 20px;
      bottom: 5px;
    }

    &:nth-child(3) {
      right: 0px;
      bottom: 5px;
    }

    // Targetting firefox
    @media screen and (min--moz-device-pixel-ratio:0) {
      &:nth-child(2), &:nth-child(3) {
        bottom: 8px;
      }
    }
  }
`

const LoadingImage = styled.img`
  position: absolute;
  bottom: 3px;
  right: 0px;
`

export {
  InlineAddWrapper,
  AddCTAWrapper,
  AddInput,
  AddInputWrapper,
  LoadingImage,
}
