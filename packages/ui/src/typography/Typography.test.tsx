import React from 'react'
import { create } from 'react-test-renderer'
import { ThemeProvider } from 'styled-components'
import apydoxDefault from '@ui/themes/apydoxDefault'
import {
  Canon,
  Trafalgar,
  Paragon,
  DoublePica,
  GreatPrimer,
  BodyCopy,
  Pica,
  PicaSerif,
  LongPrimer,
  Brevier,
  Minion,
} from './Typography'

const testRenders = (reactElem: React.ReactElement): void => {
  it('should render without any issues', () => {
    const tree = create(
      <ThemeProvider theme={apydoxDefault}>{reactElem}</ThemeProvider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
}

describe('Typography', () => {
  describe('Canon', () => {
    testRenders(<Canon>This is some canon text</Canon>)
  })

  describe('Trafalgar', () => {
    testRenders(<Trafalgar>This is some trafalgar text</Trafalgar>)
  })

  describe('Paragon', () => {
    testRenders(<Paragon>This is some paragon text</Paragon>)
  })

  describe('DoublePica', () => {
    testRenders(<DoublePica>This is some double pica text</DoublePica>)
  })

  describe('GreatPrimer', () => {
    testRenders(<GreatPrimer>This is some great primer text</GreatPrimer>)
  })

  describe('BodyCopy', () => {
    testRenders(<BodyCopy>This is some body copy text</BodyCopy>)
  })

  describe('Pica', () => {
    testRenders(<Pica>This is some pica text</Pica>)
  })

  describe('PicaSerif', () => {
    testRenders(<PicaSerif>This is some pica serif text</PicaSerif>)
  })

  describe('LongPrimer', () => {
    testRenders(<LongPrimer>This is some long primer text</LongPrimer>)
  })

  describe('Brevier', () => {
    testRenders(<Brevier>This is some brevier text</Brevier>)
  })

  describe('Minion', () => {
    testRenders(<Minion>This is some minion text</Minion>)
  })
})
