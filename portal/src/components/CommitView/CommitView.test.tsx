import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-test-renderer'
import { enzymeFind } from 'styled-components/test-utils'

import CommitView from './CommitView'
import {
  CommitViewTextArea,
  CommitViewButton,
  CentredImage,
} from './commitView.styles'

describe('CommitView', (): void => {
  it('should render without any issues', (): void => {
    const wrapper = mount(
      <CommitView
        commitDescription=""
        spec=""
        currentSpecSHA=""
        show
        isCommitting={false}
      />
    )
    expect(wrapper.find('div').length).toBeGreaterThan(0)
  })

  it('should update the current commit description when the text field is changed', (): void => {
    const setCurrentCommitDescription = jest.fn()
    const wrapper = mount(
      <CommitView
        commitDescription=""
        spec=""
        currentSpecSHA=""
        show={false}
        isCommitting={false}
        setCurrentCommitDescription={setCurrentCommitDescription}
      />
    )
    act((): void => {
      enzymeFind(wrapper, CommitViewTextArea).simulate('change', {
        target: { value: 'This is a commit description' },
      })
    })
    expect(setCurrentCommitDescription).toHaveBeenCalledWith(
      'This is a commit description'
    )
  })

  it('should commit changes if there is content in the commit description', (): void => {
    const commitChanges = jest.fn()
    const wrapper = mount(
      <CommitView
        commitDescription="This is the commit description"
        spec="This is the specification of complete and utter madness"
        currentSpecSHA="dasd32130sasd"
        show
        isCommitting={false}
        commitChanges={commitChanges}
      />
    )
    act((): void => {
      enzymeFind(wrapper, CommitViewButton).simulate('click', { target: {} })
    })
    expect(commitChanges).toHaveBeenCalledWith(
      'This is the commit description',
      'This is the specification of complete and utter madness',
      'dasd32130sasd'
    )
  })

  it('should contain a centered image that contains a loader when we are in the process of committing changes', (): void => {
    const wrapper = mount(
      <CommitView
        commitDescription="This is the commit description"
        spec="This is the specification of complete and utter madness"
        currentSpecSHA="dasd32130sasd"
        show
        isCommitting={true}
      />
    )
    expect(enzymeFind(wrapper, CentredImage).length).toBe(1)
  })
})
