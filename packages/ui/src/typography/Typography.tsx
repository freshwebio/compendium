import React from 'react'
import DynamicComponent from './DynamicComponent'
import theme from '@ui/themes/apydoxDefault'

const {
  canon,
  trafalgar,
  paragon,
  doublePica,
  greatPrimer,
  bodyCopy,
  pica,
  picaSerif,
  longPrimer,
  brevier,
  minion,
} = theme.textStyles

export const Canon: React.FunctionComponent<any> = (props: any) => (
  <DynamicComponent styleName={'canon'} {...canon} {...props}>
    {props.children}
  </DynamicComponent>
)

export const Trafalgar: React.FunctionComponent<any> = (props: any) => (
  <DynamicComponent styleName={'trafalgar'} {...trafalgar} {...props}>
    {props.children}
  </DynamicComponent>
)

export const Paragon: React.FunctionComponent<any> = (props: any) => (
  <DynamicComponent styleName={'paragon'} {...paragon} {...props}>
    {props.children}
  </DynamicComponent>
)

export const DoublePica: React.FunctionComponent<any> = (props: any) => (
  <DynamicComponent styleName={'doublePica'} {...doublePica} {...props}>
    {props.children}
  </DynamicComponent>
)

export const GreatPrimer: React.FunctionComponent<any> = (props: any) => (
  <DynamicComponent styleName={'greatPrimer'} {...greatPrimer} {...props}>
    {props.children}
  </DynamicComponent>
)

export const BodyCopy: React.FunctionComponent<any> = (props: any) => (
  <DynamicComponent styleName={'bodyCopy'} {...bodyCopy} {...props}>
    {props.children}
  </DynamicComponent>
)

export const Pica: React.FunctionComponent<any> = (props: any) => (
  <DynamicComponent styleName={'pica'} {...pica} {...props}>
    {props.children}
  </DynamicComponent>
)

export const PicaSerif: React.FunctionComponent<any> = (props: any) => (
  <DynamicComponent styleName={'picaSerif'} {...picaSerif} {...props}>
    {props.children}
  </DynamicComponent>
)

export const LongPrimer: React.FunctionComponent<any> = (props: any) => (
  <DynamicComponent styleName={'longPrimer'} {...longPrimer} {...props}>
    {props.children}
  </DynamicComponent>
)

export const Brevier: React.FunctionComponent<any> = (props: any) => (
  <DynamicComponent styleName={'brevier'} {...brevier} {...props}>
    {props.children}
  </DynamicComponent>
)

export const Minion: React.FunctionComponent<any> = (props: any) => (
  <DynamicComponent styleName={'minion'} {...minion} {...props}>
    {props.children}
  </DynamicComponent>
)
