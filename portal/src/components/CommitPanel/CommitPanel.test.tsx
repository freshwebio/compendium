import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-test-renderer'

import CommitPanel from './CommitPanel'
import IconButton from 'components/IconButton'

describe('CommitPanel', (): void => {
  it('should render without any issues', (): void => {
    const wrapper = mount(
      <CommitPanel
        editor={{
          documentHasChanged: false,
          spec: '',
          currentSpecSHA: '',
          currentCommitDescription: '',
          isCommitting: false,
        }}
        setCurrentCommitDescription={(): void => {}}
        commitChanges={(): void => {}}
      />
    )
    expect(wrapper.find('div').length).toBeGreaterThan(0)
  })

  it('should show the commit panel view if the document has changed and the icon click is triggered', (): void => {
    const wrapper = mount(
      <CommitPanel
        editor={{
          documentHasChanged: true,
          spec: '',
          currentSpecSHA: '',
          currentCommitDescription: '',
          isCommitting: false,
        }}
        setCurrentCommitDescription={(): void => {}}
        commitChanges={(): void => {}}
      />
    )
    const iconButton = wrapper.find(IconButton)
    expect(iconButton.length).toBe(1)
    act(
      (): void => {
        iconButton.simulate('click', { target: {} })
      }
    )
    // Only lasts for as long as CommitView is a class-based component and not
    // a styled component.
    // TODO: Alter test when CommitView is a styled component.
    expect(wrapper.find('.App-CommitView').hasClass('visible')).toBeTrue()
  })
})
