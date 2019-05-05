import React from 'react'

import { gitHubAuthUrl } from 'utils/urls'
import ApiDefList from 'components/ApiDefList'
import LoadingScreen from 'components/LoadingScreen'

import { HomeWrapper, LoginButton } from './home.styles'

interface HomeProps {
  isLoading: boolean
  isLoggedIn: boolean
}

const Home: React.FunctionComponent<HomeProps> = ({
  isLoading,
  isLoggedIn,
}): React.ReactElement => {
  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <HomeWrapper>
      {isLoggedIn ? (
        <ApiDefList />
      ) : (
        <LoginButton href={gitHubAuthUrl()}>Login</LoginButton>
      )}
    </HomeWrapper>
  )
}

export default Home
