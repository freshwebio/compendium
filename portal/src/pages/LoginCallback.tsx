import React from 'react'
import { withRouter } from 'react-router-dom'

import { getAccessToken } from '../services/auth'
import LoadingScreen from '../components/LoadingScreen'

class LoginCallback extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
  }

  async componentDidMount() {
    const codeMatch = window.location.href.match(/\?code=(.*)/)
    const code = codeMatch && codeMatch[1]
    if (code) {
      try {
        const token = await getAccessToken(code)
        if (this.props.setIsLoggedIn) {
          this.props.setIsLoggedIn(true)
        }
        sessionStorage.setItem('madswagger-gh-token', token)
        window.location.href = '/'
      } catch (err) {
        console.log(err)
      }
    }
  }

  render() {
    return <LoadingScreen />
  }
}

export default withRouter(LoginCallback)
