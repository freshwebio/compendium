import React, { useEffect } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import { getAccessToken } from 'services/auth'
import LoadingScreen from 'components/LoadingScreen'

interface LoginCallbackOwnProps {
  setIsLoggedIn: (isLoggedIn: boolean) => void
}

type LoginCallbackProps = RouteComponentProps<any> & LoginCallbackOwnProps

const LoginCallback: React.FunctionComponent<LoginCallbackProps> = (
  props
): React.ReactElement => {
  useEffect((): void => {
    const logUserIn = async (): Promise<void> => {
      const codeMatch = window.location.href.match(/\?code=(.*)/)
      const code = codeMatch && codeMatch[1]

      if (code) {
        try {
          const token = await getAccessToken(code)
          if (props.setIsLoggedIn) {
            props.setIsLoggedIn(true)
          }
          sessionStorage.setItem('madswagger-gh-token', token)
          window.location.href = '/'
        } catch (err) {
          console.log(err)
        }
      }
    }
    logUserIn()
  }, [])
  return <LoadingScreen />
}

export default withRouter(LoginCallback)
