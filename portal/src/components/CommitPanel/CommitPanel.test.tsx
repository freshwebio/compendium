import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-test-renderer'

import CommitPanel from './CommitPanel'
import IconButton from 'components/IconButton'
import CommitView from 'components/CommitView'

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
    // Does props of a child component count as an implementation detail? possibly find a better approach here.
    expect(wrapper.find(CommitView).props().show).toBeTrue()
  })
})
