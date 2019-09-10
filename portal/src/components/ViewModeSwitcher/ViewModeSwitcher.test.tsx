import React from 'react'
import { create, ReactTestRenderer } from 'react-test-renderer'

import ViewModeSwitcher from './ViewModeSwitcher'
import { Link, MemoryRouter } from 'react-router-dom'
import IconButton from 'components/IconButton'
import { ExpandLinkWrapper } from './viewModeSwitcher.styles'
import DisableableLink from 'components/DisableableLink'

describe('ViewModeSwitcher', (): void => {
  it('should render without any errors when neither in view or edit mode', (): void => {
    create(
      <ViewModeSwitcher
        isLoggedIn={false}
        viewMatch={{ params: {}, isExact: true, path: '/', url: '/' }}
        editorMatch={null}
        documentHasChanged={false}
      />
    )
  })

  it('should render without any errors when in view mode', (): void => {
    const renderer: ReactTestRenderer = create(
      <MemoryRouter>
        <ViewModeSwitcher
          isLoggedIn={true}
          viewMatch={{
            params: { service: 'group1::Service1' },
            isExact: false,
            path: '/view/group1::Service1',
            url: '/view/group1::Service1',
          }}
          editorMatch={null}
          documentHasChanged={false}
        />
      </MemoryRouter>
    )
    expect(renderer.root.findAllByType(Link).length).toEqual(1)
    expect(renderer.root.findAllByType(IconButton).length).toEqual(1)
  })

  it('should render without any errors when in edit mode', (): void => {
    const renderer: ReactTestRenderer = create(
      <MemoryRouter>
        <ViewModeSwitcher
          isLoggedIn={true}
          editorMatch={{
            params: { service: 'group1::Service1' },
            isExact: false,
            path: '/edit/group1::Service1',
            url: '/edit/group1::Service1',
          }}
          viewMatch={null}
          documentHasChanged={false}
        />
      </MemoryRouter>
    )

    expect(renderer.root.findAllByType(ExpandLinkWrapper).length).toEqual(1)
    expect(renderer.root.findAllByType(DisableableLink).length).toEqual(1)
    expect(renderer.root.findAllByType(IconButton).length).toEqual(1)
  })
})
