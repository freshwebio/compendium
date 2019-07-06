import React from 'react'

import { gitHubAuthUrl } from 'utils/urls'
import ApiDefList from 'components/ApiDefList'
import LoadingScreen from 'components/LoadingScreen'
import content from 'content.json'

import {
  HomeWrapper,
  LoginButton,
  LoginButtonWrapper,
  Heading,
  SummaryText,
} from './home.styles'

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
        <>
          <Heading>
            {content.login.title || 'Welcome to the apydox portal'}
          </Heading>
          {content.login.summary && content.login.summary.length > 0
            ? content.login.summary.map(
                (paragraph, index): React.ReactElement => (
                  // React doesn't like using just the index as keys, so let's add the first character
                  // of the paragraph to the key.
                  <SummaryText key={paragraph.charAt(0) + index}>
                    {paragraph}
                  </SummaryText>
                )
              )
            : null}
          <LoginButtonWrapper>
            <LoginButton href={gitHubAuthUrl()}>Login</LoginButton>
          </LoginButtonWrapper>
        </>
      )}
    </HomeWrapper>
  )
}

export default Home
