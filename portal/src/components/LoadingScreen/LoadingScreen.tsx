import React from 'react'

import './LoadingScreen.scss'
import Loader from '../../assets/images/loader.svg'

const LoadingScreen = () => (
  <div className="LoadingScreen">
    <img src={Loader} />
  </div>
)

export default LoadingScreen
