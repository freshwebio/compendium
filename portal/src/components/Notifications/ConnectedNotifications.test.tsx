import React from 'react'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { act } from 'react-test-renderer'

import ConnectedNotifications from './ConnectedNotifications'
import mountWithTheme from 'testUtils/mountWithTheme'
import mockTheme from 'testUtils/mockTheme'
import { NotificationClose } from 'components/Notification/notification.styles'
import { NOTIFICATION_CLOSE_WAIT_TIME } from 'components/Notification/Notification'
import { REMOVE_NOTIFICATION } from 'appredux/actions/global/types'
import delay from 'utils/delay'

const mockStore = configureMockStore([])

describe('ConnectedNotifications', (): void => {
  it('should render without any issues', (): void => {
    const wrapper = mountWithTheme(
      <Provider
        store={mockStore({
          editor: {
            documentHasChanged: false,
            spec: '',
            currentSpecSHA: '',
            currentCommitDescription: '',
            isCommitting: false,
          },
          global: { notifications: [] },
        })}
      >
        <ConnectedNotifications />
      </Provider>,
      mockTheme
    )
    expect(wrapper.find('div').length).toBeGreaterThan(0)
  })

  it('should dispatch action for removing a notification', async (): Promise<
    void
  > => {
    const store = mockStore({
      editor: {
        documentHasChanged: true,
        spec: 'This is the changed spec',
        currentSpecSHA: 'fgt343123dasd',
        currentCommitDescription: 'Made some endpoint changes',
        isCommitting: false,
      },
      global: {
        notifications: [
          {
            id: '43ab-Fresd-213sa-Qsw23',
            message: 'Something great happened!',
            type: 'success',
          },
        ],
      },
    })

    const wrapper = mountWithTheme(
      <Provider store={store}>
        <ConnectedNotifications />
      </Provider>,
      mockTheme
    )

    act(
      (): void => {
        wrapper.find(NotificationClose).simulate('click', {})
      }
    )

    // removeNotification won't get triggered until the timeout is complete
    // to allow for the slide out transition for notifications.
    await act(
      async (): Promise<void> => {
        await delay(NOTIFICATION_CLOSE_WAIT_TIME)
      }
    )

    expect(store.getActions()).toEqual([
      { type: REMOVE_NOTIFICATION, id: '43ab-Fresd-213sa-Qsw23' },
    ])
  })
})
