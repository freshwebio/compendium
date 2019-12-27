import * as React from 'react'
import { storiesOf } from '@storybook/react'
import {
  Canon,
  Trafalgar,
  Paragon,
  DoublePica,
  GreatPrimer,
  BodyCopy,
  Pica,
  LongPrimer,
  Brevier,
  Minion,
} from './Typography'

const stories = storiesOf('Typography', module)

stories.add('Canon', () => <Canon>Canon Text Style</Canon>)

stories.add('Trafalgar', () => <Trafalgar>Trafalgar Text Style</Trafalgar>)

stories.add('Paragon', () => <Paragon>Paragon Text Style</Paragon>)

stories.add('Double Pica', () => (
  <DoublePica>Double Pica Text Style</DoublePica>
))

stories.add('Great Primer', () => (
  <GreatPrimer>Great Primer Text Style</GreatPrimer>
))

stories.add('Body Copy', () => <BodyCopy>Body Copy Text Style</BodyCopy>)

stories.add('Pica', () => <Pica>Pica Text Style</Pica>)

stories.add('Long Primer', () => (
  <LongPrimer>Long Primer Text Style</LongPrimer>
))

stories.add('Brevier', () => <Brevier>Brevier Text Style</Brevier>)

stories.add('Minion', () => <Minion>Minion Text Style</Minion>)
