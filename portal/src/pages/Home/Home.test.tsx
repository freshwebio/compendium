import React from 'react'
import { MemoryRouter } from 'react-router'
import { act, ReactTestRenderer } from 'react-test-renderer'

import createWithTheme from 'testUtils/createWithTheme'
import mockTheme from 'testUtils/mockTheme'
import Home from './Home'
import { LoginButton } from './home.styles'
import ApiDefList from 'components/ApiDefList'
import LoadingScreen from 'components/LoadingScreen'

describe('Home', (): void => {
  it('should render an api definition list component when the user is logged in', async (): Promise<
    void
  > => {
    let rendered: ReactTestRenderer
    await act(
      async (): Promise<void> => {
        rendered = createWithTheme(
          <MemoryRouter>
            <Home isLoading={false} isLoggedIn={true} />
          </MemoryRouter>,
          mockTheme
        )
      }
    )

    expect(rendered.root.findAllByType(ApiDefList).length).toBe(1)
  })

  it('should render a loading screen when login is still being attempted', (): void => {
    const rendered = createWithTheme(
      <MemoryRouter>
        <Home isLoading={true} isLoggedIn={false} />
      </MemoryRouter>,
      mockTheme
    )
    expect(rendered.root.findAllByType(ApiDefList).length).toBe(0)
    expect(rendered.root.findAllByType(LoginButton).length).toBe(0)
    expect(rendered.root.findAllByType(LoadingScreen).length).toBe(1)
  })

  it('should render a login button when the user is not logged in', (): void => {
    const rendered = createWithTheme(
      <MemoryRouter>
        <Home isLoading={false} isLoggedIn={false} />
      </MemoryRouter>,
      mockTheme
    )
    expect(rendered.root.findAllByType(ApiDefList).length).toBe(0)
    expect(rendered.root.findAllByType(LoginButton).length).toBe(1)
    expect(rendered.root.findAllByType(LoadingScreen).length).toBe(0)
  })
})
