import React from 'react'
import { mount } from 'enzyme'
import mountWithTheme from 'testUtils/mountWithTheme'

import IconButton from './IconButton'
import { StyledIcon } from './iconButton.styles'

describe('IconButton', (): void => {
  it('should render without any issues', (): void => {
    const wrapper = mount(
      <IconButton
        iconClassName=""
        isTooltipContainer={true}
        onClick={(): void => {}}
        disabled={false}
        colour=""
        iconFontSize="14pt"
      />
    )
    expect(wrapper.find('button').length).toBe(1)
  })

  it('should produce a disabled visual state correctly', (): void => {
    const wrapper = mountWithTheme(
      <IconButton
        iconClassName=""
        isTooltipContainer={true}
        onClick={(): void => {}}
        disabled={true}
        colour=""
        iconFontSize="14pt"
      />,
      {}
    )
    expect(wrapper).toHaveStyleRule('cursor', 'not-allowed')
    expect(wrapper.find(StyledIcon)).toHaveStyleRule('opacity', '0.5')
  })

  it('should present a tooltip if the button has a tooltip', (): void => {})

  it('should not present a tooltip if the button is not meant to have a tooltip', (): void => {})
})
