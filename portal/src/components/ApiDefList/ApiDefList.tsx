import React from 'react'
import { getApiDefs } from '../../services/github'
import ApiDefGroup from '../ApiDefGroup'

class ApiDefList extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = { apiDefinitionGroups: [] }
  }

  async componentDidMount() {
    try {
      const apiDefs = await getApiDefs()
      this.setState({ apiDefinitionGroups: apiDefs })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <div className="ApiDefList">
        {this.state.apiDefinitionGroups.map((group: any, index: number) => {
          return (
            <ApiDefGroup
              key={index}
              group={group.name}
              definitions={group.definitions}
            />
          )
        })}
      </div>
    )
  }
}

export default ApiDefList
