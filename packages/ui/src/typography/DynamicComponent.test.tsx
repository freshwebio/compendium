import React from 'react'
import { ThemeProvider } from 'styled-components'
import { create } from 'react-test-renderer'
import apydoxDefault from '@ui/themes/apydoxDefault'
import DynamicComponent from './DynamicComponent'

const { brevier } = apydoxDefault.textStyles

describe('DynamicComponent', () => {
  it('should render with the correct text style theme values', () => {
    const tree = create(
      <ThemeProvider theme={apydoxDefault}>
        <DynamicComponent styleName={'brevier'} {...brevier} />
      </ThemeProvider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule('font-size', '14px')
    expect(tree).toHaveStyleRule('font-size', '14px', {
      media: 'screen and (min-width:319px)',
    })
    expect(tree).toHaveStyleRule('font-size', '13px', {
      media: 'screen and (min-width:599px)',
    })
    expect(tree).toHaveStyleRule('line-height', '16px')
    expect(tree).toHaveStyleRule('line-height', '18px', {
      media: 'screen and (min-width:319px)',
    })
    expect(tree).toHaveStyleRule('line-height', '16px', {
      media: 'screen and (min-width:599px)',
    })
  })
})
