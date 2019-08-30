import React from 'react'
import { create, ReactTestRenderer, act } from 'react-test-renderer'
import { MemoryRouter } from 'react-router'

import Tooltip from 'components/Tooltip'
import DisableableLink from './DisableableLink'
import { StyledDisableableLink } from './disableableLink.styles'

describe('DisableableLink', (): void => {
  it('should render correctly as an enabled link without a tooltip with children', (): void => {
    const renderer: ReactTestRenderer = create(
      <MemoryRouter initialEntries={['/']}>
        <DisableableLink disabled={false} disabledMessage="" to="/test">
          <div className="children" />
        </DisableableLink>
      </MemoryRouter>
    )
    expect(renderer.root.findAllByProps({ className: 'children' }).length).toBe(
      1
    )
    expect(renderer.root.findAllByType(Tooltip).length).toBe(0)
  })

  it('should render correctly as a disabled link with a tooltip with children', (): void => {
    const renderer: ReactTestRenderer = create(
      <MemoryRouter initialEntries={['/']}>
        <DisableableLink disabled={true} disabledMessage="" to="/test">
          <div className="children" />
        </DisableableLink>
      </MemoryRouter>
    )
    expect(renderer.root.findAllByProps({ className: 'children' }).length).toBe(
      1
    )
    expect(renderer.root.findAllByType(Tooltip).length).toBe(1)
  })

  it('should not go to the link destination on click when the link is disabled', async (): Promise<
    void
  > => {
    const renderer: ReactTestRenderer = create(
      <MemoryRouter initialEntries={['/']}>
        <DisableableLink disabled={true} disabledMessage="" to="/test">
          <div className="children" />
        </DisableableLink>
      </MemoryRouter>
    )
    const event = { preventDefault: jest.fn() }
    await act(
      async (): Promise<void> => {
        renderer.root.findByType(StyledDisableableLink).props.onClick(event)
      }
    )
    expect(event.preventDefault).toHaveBeenCalled()
  })

  it('should not prevent default on click when the link is enabled', async (): Promise<
    void
  > => {
    const renderer: ReactTestRenderer = create(
      <MemoryRouter initialEntries={['/']}>
        <DisableableLink disabled={false} disabledMessage="" to="/test">
          <div className="children" />
        </DisableableLink>
      </MemoryRouter>
    )
    const event = { preventDefault: jest.fn() }
    await act(
      async (): Promise<void> => {
        renderer.root.findByType(StyledDisableableLink).props.onClick(event)
      }
    )
    expect(event.preventDefault).toHaveBeenCalledTimes(0)
  })
})
