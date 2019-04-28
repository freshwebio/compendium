import React from 'react'
import './Home.scss'
import { gitHubAuthUrl } from 'utils/urls'
import ApiDefList from 'components/ApiDefList'
import LoadingScreen from 'components/LoadingScreen'

class Home extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
  }

  render() {
    if (this.props.isLoading) {
      return <LoadingScreen />
    }

    return (
      <div className="Home">
        {this.props.isLoggedIn ? (
          <ApiDefList />
        ) : (
          <a className="LoginButton" href={gitHubAuthUrl()}>
            Login
          </a>
        )}
      </div>
    )
  }
}

export default Home
