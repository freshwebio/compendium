import React from 'react'
import { darken, lighten } from 'polished'
import { act } from 'react-test-renderer'

import mountWithTheme from 'testUtils/mountWithTheme'
import mockTheme from 'testUtils/mockTheme'

import Notification, {
  NOTIFICATION_LOAD_WAIT_TIME,
  NOTIFICATION_CLOSE_WAIT_TIME,
} from './Notification'
import {
  NotificationInsideWrapper,
  NotificationClose,
} from './notification.styles'
import delay from 'utils/delay'

describe('Notification', (): void => {
  it('should render without any issues', (): void => {
    const wrapper = mountWithTheme(
      <Notification
        message="Notification message"
        type="error"
        onClose={jest.fn()}
      />,
      mockTheme
    )
    expect(wrapper.find('div').length).toBeGreaterThan(0)
  })

  it('should contain the correct styles for the error message type', (): void => {
    const wrapper = mountWithTheme(
      <Notification
        message="Notification message"
        type="error"
        onClose={jest.fn()}
      />,
      mockTheme
    )
    const notificationInsideWrapper = wrapper.find(NotificationInsideWrapper)
    expect(notificationInsideWrapper).toHaveStyleRule(
      'background',
      mockTheme.colours.red
    )
    expect(notificationInsideWrapper).toHaveStyleRule(
      'border',
      `2px solid ${darken(0.1, mockTheme.colours.red)}`
    )
    expect(notificationInsideWrapper).toHaveStyleRule(
      'color',
      `${lighten(0.3, mockTheme.colours.red)}`,
      { modifier: `${NotificationClose}` }
    )
  })

  it('should contain the correct styles for the success message type', (): void => {
    const wrapper = mountWithTheme(
      <Notification
        message="Notification message"
        type="success"
        onClose={jest.fn()}
      />,
      mockTheme
    )
    const notificationInsideWrapper = wrapper.find(NotificationInsideWrapper)
    expect(notificationInsideWrapper).toHaveStyleRule(
      'background',
      mockTheme.colours.green
    )
    expect(notificationInsideWrapper).toHaveStyleRule(
      'border',
      `2px solid ${darken(0.1, mockTheme.colours.green)}`
    )
    expect(notificationInsideWrapper).toHaveStyleRule(
      'color',
      `${lighten(0.3, mockTheme.colours.green)}`,
      { modifier: `${NotificationClose}` }
    )
  })

  it('should have loaded and set the correct visible styles after initial wait time', async (): Promise<
    void
  > => {
    const wrapper = mountWithTheme(
      <Notification
        message="Notification message"
        type="success"
        onClose={jest.fn()}
      />,
      mockTheme
    )
    await act(
      async (): Promise<void> => {
        await delay(NOTIFICATION_LOAD_WAIT_TIME)
      }
    )
    // We need to ensure we update to carry out another render.
    wrapper.update()
    expect(wrapper.find(NotificationInsideWrapper)).toHaveStyleRule(
      'transform',
      'translateX(0)'
    )
  })

  it('should invoke our close callback and set the correct styles after wait time', async (): Promise<
    void
  > => {
    const onClose = jest.fn()
    const wrapper = mountWithTheme(
      <Notification
        message="Notification message"
        type="success"
        onClose={onClose}
      />,
      mockTheme
    )
    await act(
      async (): Promise<void> => {
        await delay(NOTIFICATION_LOAD_WAIT_TIME)
      }
    )
    // Testing the initial UI state of notification being fully loaded.
    wrapper.update()
    expect(wrapper.find(NotificationInsideWrapper)).toHaveStyleRule(
      'transform',
      'translateX(0)'
    )

    // Now to test the close functionality.
    act(
      (): void => {
        wrapper.find(NotificationClose).simulate('click', { target: {} })
      }
    )

    await act(
      async (): Promise<void> => {
        await delay(NOTIFICATION_CLOSE_WAIT_TIME)
      }
    )
    wrapper.update()
    expect(wrapper.find(NotificationInsideWrapper)).toHaveStyleRule(
      'transform',
      'translateX(+100%)'
    )
    expect(onClose).toHaveBeenCalled()
  })
})
