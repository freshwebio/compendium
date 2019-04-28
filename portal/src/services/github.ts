import axios, { AxiosInstance } from 'axios'
import { toLabel, idToServiceDefinionPath } from 'utils/files'

const createGithubApi = (): AxiosInstance => {
  let token
  try {
    token = sessionStorage.getItem('madswagger-gh-token')
  } catch (e) {
    console.log(e)
  }
  return axios.create({
    baseURL: 'https://api.github.com',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token || ''}`,
    },
  })
}

const api = createGithubApi()

const getSHAForBranch = async (
  branch: string,
  owner: string,
  repo: string
): Promise<string> => {
  const response = await api.get(`/repos/${owner}/${repo}/branches/${branch}`)
  const {
    data: {
      commit: { sha },
    },
  } = response
  return sha
}

export interface FileEntry {
  path: string
  type: string
}

export interface ApiDefinitionGroup {
  name: string
  id: string
  definitions: FileEntry[]
}

const prepareApiDefGroups = (
  accum: ApiDefinitionGroup[],
  fileEntry: FileEntry
): ApiDefinitionGroup[] => {
  // We only care about top-level directories for grouping.
  if (fileEntry.type === 'tree' && fileEntry.path.indexOf('/') === -1) {
    return [
      ...accum,
      { name: toLabel(fileEntry.path), id: fileEntry.path, definitions: [] },
    ]
  } else if (
    (fileEntry.path.endsWith('.yaml') || fileEntry.path.endsWith('.yml')) &&
    fileEntry.type === 'blob'
  ) {
    const parts = fileEntry.path.split('/')
    // Ignore api definition files that are not in a group directory.
    if (parts.length > 1) {
      const groupId = parts[parts.length - 2]
      const targetGroup = accum.find(
        (currentGroup): boolean => currentGroup.id === groupId
      )
      if (targetGroup) {
        const rest = accum.filter(
          (currentGroup): boolean => currentGroup.id !== groupId
        )
        return [
          ...rest,
          {
            name: targetGroup.name,
            id: targetGroup.id,
            definitions: [...targetGroup.definitions, fileEntry],
          },
        ]
      }
    }
  }
  return accum
}

export const getApiDefs = async (
  branch: string = 'master'
): Promise<ApiDefinitionGroup[]> => {
  const owner = process.env.REACT_APP_API_DOCS_REPO_OWNER || ''
  const repo = process.env.REACT_APP_API_DOCS_REPO || ''
  const treeSHA = await getSHAForBranch(branch, owner, repo)
  const response = await api.get(
    `/repos/${owner}/${repo}/git/trees/${treeSHA}`,
    { params: { recursive: 1 } }
  )
  const { tree: treeAsList } = response.data
  const apiDefs: ApiDefinitionGroup[] = treeAsList.reduce(
    prepareApiDefGroups,
    []
  )
  // Filter out any directories that do not contain api definitions.
  return apiDefs.filter((group): boolean => group.definitions.length > 0)
}

/**
 * Loads a service definition file, there should not be any APIs that warrant a yaml file of >1mb
 * so we can use the base64-encoded contents from the github v3 API get contents endpoint.
 *
 * @param service
 * @param branch
 */
export const loadServiceDefinition = async (
  service: string,
  branch: string = 'master'
): Promise<{ content: string; sha: string }> => {
  try {
    const owner = process.env.REACT_APP_API_DOCS_REPO_OWNER || ''
    const repo = process.env.REACT_APP_API_DOCS_REPO || ''
    const serviceDefinitionPath = idToServiceDefinionPath(service)
    const response = await api.get(
      `/repos/${owner}/${repo}/contents/${serviceDefinitionPath}?ref=${branch}`
    )
    return { content: atob(response.data.content), sha: response.data.sha }
  } catch (err) {
    console.log(err)
  }
  return { content: '', sha: '' }
}
