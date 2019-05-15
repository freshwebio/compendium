import React from 'react'
import TestRenderer from 'react-test-renderer'

import Tooltip from './Tooltip'
import { StyledTooltip } from './tooltip.styles'

describe('Tooltip', (): void => {
  it('should render without any issues and contain the provided text', (): void => {
    const rendered = TestRenderer.create(<Tooltip text="Save changes" />)
    expect(rendered.root.props.text).toBe('Save changes')
    expect(rendered.root.findAllByType(StyledTooltip).length).toBe(1)
  })
})
