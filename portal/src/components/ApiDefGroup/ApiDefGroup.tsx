import React from 'react'

import './ApiDefGroup.scss'
import ApiDefCard from '../ApiDefCard'

class ApiDefGroup extends React.Component<any, any> {
  render() {
    return (
      <div className="ApiDefGroup">
        <h3 className="Madswagger-heading">{this.props.group}</h3>
        <div className="Madswagger-cards">
          {this.props.definitions.map((definition: any, index: number) => {
            return <ApiDefCard key={definition.path} definition={definition} />
          })}
        </div>
      </div>
    )
  }
}

export default ApiDefGroup
