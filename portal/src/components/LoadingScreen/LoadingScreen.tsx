import React from 'react'

import { LoadingScreenWrapper } from './loadingScreen.styles'
import Loader from 'assets/images/loader.svg'

const LoadingScreen: React.FunctionComponent<{}> = (): React.ReactElement => (
  <LoadingScreenWrapper>
    <img src={Loader} alt="Loading" />
  </LoadingScreenWrapper>
)

export default LoadingScreen
