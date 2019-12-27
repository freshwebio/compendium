import React from 'react'
import styled from 'styled-components'
import { create } from 'react-test-renderer'

import { touchTextSystem } from './touchTextSystem'

describe('touchTextSystem', () => {
  it('should produce a correct set of styles for touch devices when size scales are provided', () => {
    const testTheme = {
      fontSizes: [11, 13, 15, 17, 21, 32],
      lineHeights: [15, 17, 19, 21, 25, 40],
      extraStyles: {
        testStyle: {
          fontSize: { mdTouch: 1 },
          lineHeight: { mdTouch: 1 },
        },
      },
      mediaQueries: {
        sm: `@media screen and (min-width: 319px)`,
        mdTouch: `@media screen and (min-width: 599px)`,
        md: `@media screen and (min-width: 599px)`,
      },
    }
    const TestStyledComp = styled.div`
      ${touchTextSystem({
        extraStylesProp: 'extraStyles',
        fontSize: { property: 'fontSize', scale: 'fontSizes' },
        lineHeight: { property: 'lineHeight', scale: 'lineHeights' },
      })}
    `
    const tree = create(
      <TestStyledComp styleName="testStyle" theme={testTheme} />
    ).toJSON()
    expect(tree).toHaveStyleRule('font-size', '13px', {
      media: 'screen and (min-width:599px) and (pointer:coarse)',
    })
    expect(tree).toHaveStyleRule('line-height', '17px', {
      media: 'screen and (min-width:599px) and (pointer:coarse)',
    })
  })

  it('should produce a correct set of style rules for touch devices when size scales are not provided', () => {
    const testTheme = {
      extraStyles: {
        testStyle: {
          fontSize: { mdTouch: '15px' },
          lineHeight: { mdTouch: '19px' },
        },
      },
      mediaQueries: {
        sm: `@media screen and (min-width: 319px)`,
        mdTouch: `@media screen and (min-width: 599px)`,
        md: `@media screen and (min-width: 599px)`,
      },
    }
    const TestStyledComp = styled.div`
      ${touchTextSystem({
        extraStylesProp: 'extraStyles',
        fontSize: { property: 'fontSize', scale: 'fontSizes' },
        lineHeight: { property: 'lineHeight', scale: 'lineHeights' },
      })}
    `
    const tree = create(
      <TestStyledComp styleName="testStyle" theme={testTheme} />
    ).toJSON()
    expect(tree).toHaveStyleRule('font-size', '15px', {
      media: 'screen and (min-width:599px) and (pointer:coarse)',
    })
    expect(tree).toHaveStyleRule('line-height', '19px', {
      media: 'screen and (min-width:599px) and (pointer:coarse)',
    })
  })
})
