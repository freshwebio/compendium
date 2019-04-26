import React from 'react'

import './Tooltip.scss'

class Tooltip extends React.Component<any, any> {
  render() {
    return <div className="App-tooltip">{this.props.text}</div>
  }
}

export default Tooltip
