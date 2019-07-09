import axios, { AxiosInstance } from 'axios'
import { toLabel, idToServiceDefinitionPath } from 'utils/files'

const createGithubApi = (): AxiosInstance => {
  let token
  try {
    token = sessionStorage.getItem(
      process.env.REACT_APP_TOKEN_NAME || 'apydox-token'
    )
  } catch (e) {
    console.log(e)
  }
  return axios.create({
    baseURL: 'https://api.github.com',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token || ''}`,
      // Ensure we never get a cached response from github as we want data in the dashboard
      // to update instantly when changes are made.
      'If-None-Match': '',
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
  const isGitKeep = fileEntry.path.endsWith('.gitkeep')
  // We only care about top-level directories for grouping.
  if (fileEntry.type === 'tree' && fileEntry.path.indexOf('/') === -1) {
    return [
      ...accum,
      { name: toLabel(fileEntry.path), id: fileEntry.path, definitions: [] },
    ]
  } else if (
    (fileEntry.path.endsWith('.yaml') ||
      fileEntry.path.endsWith('.yml') ||
      isGitKeep) &&
    fileEntry.type === 'blob'
  ) {
    // ^ Allow .gitkeep so we can add new services to empty groups that have been created through the UI.
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
            definitions: !isGitKeep
              ? [...targetGroup.definitions, fileEntry]
              : targetGroup.definitions,
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
  return apiDefs
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
    const serviceDefinitionPath = idToServiceDefinitionPath(service)
    const response = await api.get(
      `/repos/${owner}/${repo}/contents/${serviceDefinitionPath}?ref=${branch}`
    )
    return { content: atob(response.data.content), sha: response.data.sha }
  } catch (err) {
    console.log(err)
  }
  return { content: '', sha: '' }
}
