import React from 'react'
import { act } from 'react-test-renderer'

import mountWithTheme from 'testUtils/mountWithTheme'
import mockTheme from 'testUtils/mockTheme'

import Notifications from './Notifications'
import { NotificationClose } from 'components/Notification/notification.styles'
import delay from 'utils/delay'
import { NOTIFICATION_CLOSE_WAIT_TIME } from 'components/Notification/Notification'

describe('Notifications', (): void => {
  it('should render without any issues', (): void => {
    const wrapper = mountWithTheme(
      <Notifications
        notifications={[
          {
            id: '34424d-1412-13124easd-asdas',
            message: 'This is a notification',
            type: 'error',
          },
        ]}
        removeNotification={(id: string): void => {}}
      />,
      mockTheme
    )
    expect(wrapper.find('div').length).toBeGreaterThan(0)
  })

  it('should call removeNotification when a notification is closed', async (): Promise<
    void
  > => {
    const removeNotification = jest.fn()
    const wrapper = mountWithTheme(
      <Notifications
        notifications={[
          {
            id: '34424d-1412-13124easd-asdas',
            message: 'This is a notification',
            type: 'error',
          },
        ]}
        removeNotification={removeNotification}
      />,
      mockTheme
    )
    act((): void => {
      wrapper.find(NotificationClose).simulate('click', {})
    })

    // removeNotification won't get triggered until the timeout is complete
    // to allow for the slide out transition for notifications.
    await act(
      async (): Promise<void> => {
        await delay(NOTIFICATION_CLOSE_WAIT_TIME)
      }
    )

    expect(removeNotification).toHaveBeenCalledWith(
      '34424d-1412-13124easd-asdas'
    )
  })
})
