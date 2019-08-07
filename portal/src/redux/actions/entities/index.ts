import {
  ADD_GROUP,
  ADD_GROUP_SUCCESS,
  ADD_GROUP_FAILURE,
  ADD_SERVICE,
  ADD_SERVICE_FAILURE,
  ADD_SERVICE_SUCCESS,
} from './types'
import { RSAA } from 'redux-api-middleware'
import { groupInputToDir, serviceInputToFile } from 'utils/files'
// Same default spec as the swagger editor.
import defaultSpecYaml from 'utils/defaultSpec'
import { sanitiseStringAlphaNumeric } from 'utils/sanitisation'

export const addGroup = (groupName: string): any => {
  const sanitisedGroupName = sanitiseStringAlphaNumeric(groupName)
  return {
    [RSAA]: {
      endpoint: `/contents/${groupInputToDir(sanitisedGroupName)}/.gitkeep`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `Added new service group ${sanitisedGroupName}`,
        content: '',
      }),
      types: [ADD_GROUP, ADD_GROUP_SUCCESS, ADD_GROUP_FAILURE],
    },
  }
}

export const addService = (groupPath: string, serviceName: string): any => {
  const sanitisedGroupPath = sanitiseStringAlphaNumeric(groupPath)
  const sanitisedServiceName = sanitiseStringAlphaNumeric(serviceName)
  return {
    [RSAA]: {
      endpoint: `/contents/${sanitisedGroupPath}/${serviceInputToFile(
        sanitisedServiceName
      )}`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `Added API definition for the ${sanitisedServiceName} in ${sanitisedGroupPath}`,
        content: btoa(defaultSpecYaml),
      }),
      types: [
        { type: ADD_SERVICE, meta: { groupId: groupPath } },
        { type: ADD_SERVICE_SUCCESS, meta: { groupId: groupPath } },
        { type: ADD_SERVICE_FAILURE, meta: { groupId: groupPath } },
      ],
    },
  }
}
