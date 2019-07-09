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

export const addGroup = (groupName: string): any => {
  return {
    [RSAA]: {
      endpoint: `/contents/${groupInputToDir(groupName)}/.gitkeep`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `Added new service group ${groupName}`,
        content: '',
      }),
      types: [ADD_GROUP, ADD_GROUP_SUCCESS, ADD_GROUP_FAILURE],
    },
  }
}

export const addService = (groupPath: string, serviceName: string): any => {
  return {
    [RSAA]: {
      endpoint: `/contents/${groupPath}/${serviceInputToFile(serviceName)}`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `Added API definition for the ${serviceName} in ${groupPath}`,
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
