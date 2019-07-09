import styled, { css } from 'styled-components'
import { darken } from 'polished'

const CommitViewWrapper = styled('div')<any>`
  position: absolute;
  top: 40px;
  right: 0;
  width: 400px;
  height: 0;
  overflow: hidden;
  transition: height 500ms ease-in-out;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
  -webkit-box-shadow: 0 5px 8px -3px black;
  -moz-box-shadow: 0 5px 8px -3px black;
  box-shadow: 0 5px 8px -3px black;
  background: #1e1e1e;
  z-index: 3501;
  height: ${({ visible }): string => (visible ? '280px' : '0')};
`

const CentredImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100px;
  transform: translate(-50%, -50%);
`

const CommitViewLabel = styled.label`
  margin-top: 10px;
  color: white;
`

const AsteriskWrapper = styled('span')<any>`
  color: ${({ colour }): string => colour};
`

const CommitViewTextArea = styled.textarea`
  width: 90%;
  height: 150px;
  margin: 15px auto;
  padding: 15px;
  resize: none;
  outline: none;
  font-family: 'Roboto', sans-serif;
  font-size: 12pt;
`

const CommitViewButton = styled.button`
  padding: 7px 15px;
  outline: none;
  border: none;
  font-family: 'Roboto', sans-serif;
  font-size: 12pt;
  border-radius: 3px;
  cursor: pointer;
  background: ${darken(0.03, '#61affe')};
  color: white;

  ${({ disabled }): any =>
    disabled
      ? css`
          opacity: 0.7;
          cursor: not-allowed;
        `
      : ''}
`

export {
  CommitViewWrapper,
  CentredImage,
  CommitViewLabel,
  AsteriskWrapper,
  CommitViewTextArea,
  CommitViewButton,
}
