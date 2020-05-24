import axios, { AxiosInstance } from 'axios'
import { toLabel, idToServiceDefinitionPath } from 'utils/files'
import defaultSpec from 'utils/defaultSpec'

const createGithubApi = (): AxiosInstance => {
  let token
  try {
    token = sessionStorage.getItem(
      process.env.REACT_APP_TOKEN_NAME || 'apydox-token'
    )
  } catch (e) {
    console.log(e)
  }
  const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'https://api.github.com',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token || ''}`,
      // Ensure we never get a cached response from github as we want data in the dashboard
      // to update instantly when changes are made.
      'If-None-Match': '',
    },
  })

  return axiosInstance
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

interface FlatTreeResponse {
  data: { tree: FileEntry[] }
}

const saveDefaultDemoDefIfNeeded = (
  owner: string,
  repo: string,
  prefix: string
): void => {
  const localContentKeys = Object.keys(localStorage).filter((key): boolean =>
    key.startsWith(prefix)
  )
  if (localContentKeys.length === 0) {
    localStorage.setItem(
      `https://api.github.com/repos/${owner}/${repo}/contents/demo-services/User-Service.yaml`,
      JSON.stringify({
        content: btoa(defaultSpec),
        sha: 'demogsdsg0sdg9839asfasdsha',
      })
    )
  }
}

const getLocalApiDefs = (owner: string, repo: string): FlatTreeResponse => {
  const prefix = `https://api.github.com/repos/${owner}/${repo}/contents/`

  // First populate local storage with the new initial api definitions if we need to.
  saveDefaultDemoDefIfNeeded(owner, repo, prefix)

  return Object.keys(localStorage).reduce(
    (accum: FlatTreeResponse, key: string): FlatTreeResponse => {
      // Add an entry for the group directory if it does not already exist.
      const path = key.replace(prefix, '')
      const pathPieces = path.split('/')
      const groupPath = pathPieces.slice(0, pathPieces.length - 1).join('/')
      const existingGroupEntry = accum.data.tree.find(
        (entry): boolean => entry.path === groupPath
      )
      const newEntries = !existingGroupEntry
        ? [
            { path: groupPath, type: 'tree' },
            { path, type: 'blob' },
          ]
        : [{ path, type: 'blob' }]

      if (key.startsWith(prefix)) {
        return {
          data: {
            tree: [...accum.data.tree, ...newEntries],
          },
        }
      }
      return accum
    },
    {
      data: { tree: [] },
    }
  )
}

export const getApiDefs = async (
  branch = 'master',
  demoMode?: boolean
): Promise<ApiDefinitionGroup[]> => {
  const owner = process.env.REACT_APP_API_DOCS_REPO_OWNER || ''
  const repo = process.env.REACT_APP_API_DOCS_REPO || ''

  let response: FlatTreeResponse
  if (process.env.REACT_APP_DEMO_MODE && demoMode) {
    response = getLocalApiDefs(owner, repo)
  } else {
    const treeSHA = await getSHAForBranch(branch, owner, repo)
    response = await api.get(`/repos/${owner}/${repo}/git/trees/${treeSHA}`, {
      params: {
        recursive: 1,
      },
    })
  }

  const { tree: treeAsList } = response.data
  const apiDefs: ApiDefinitionGroup[] = treeAsList.reduce(
    prepareApiDefGroups,
    []
  )
  return apiDefs
}

const getLocalServiceDefinition = (
  owner: string,
  repo: string,
  path: string
): { data: { content: string; sha: string } } => {
  const prefix = `https://api.github.com/repos/${owner}/${repo}/contents/`

  // First populate local storage with the new initial api definitions if we need to.
  saveDefaultDemoDefIfNeeded(owner, repo, prefix)

  const rawData = localStorage.getItem(`https://api.github.com${path}`)
  if (rawData) {
    const parsedData = JSON.parse(rawData)
    if (parsedData.content) {
      return {
        data: {
          content: parsedData.content,
          sha: parsedData.sha || 'demoshafallback',
        },
      }
    }
  }
  // If the data is not in the correct shape or is not in local storage then throw an error.
  throw Error(
    'Failed to retrieve service definition from local storage for demo mode'
  )
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
  branch = 'master',
  demoMode?: boolean
): Promise<{ content: string; sha: string }> => {
  try {
    const owner = process.env.REACT_APP_API_DOCS_REPO_OWNER ?? ''
    const repo = process.env.REACT_APP_API_DOCS_REPO ?? ''
    const serviceDefinitionPath = idToServiceDefinitionPath(service)
    const path = `/repos/${owner}/${repo}/contents/${serviceDefinitionPath}`

    let response: { data: { content: string; sha: string } }
    if (process.env.REACT_APP_DEMO_MODE && demoMode) {
      response = getLocalServiceDefinition(owner, repo, path)
    } else {
      response = await api.get(path, { params: { ref: branch } })
    }

    return { content: atob(response.data.content), sha: response.data.sha }
  } catch (err) {
    console.log(err)
  }
  return { content: '', sha: '' }
}

export type RepoPermissionLevel = 'admin' | 'write' | 'read' | 'none'

export const getPermissionLevel = async (
  username: string,
  demoMode?: boolean
): Promise<RepoPermissionLevel> => {
  if (process.env.REACT_APP_DEMO_MODE && demoMode) {
    return 'admin'
  }

  try {
    const owner = process.env.REACT_APP_API_DOCS_REPO_OWNER ?? ''
    const repo = process.env.REACT_APP_API_DOCS_REPO ?? ''
    const path = `/repos/${owner}/${repo}/collaborators/${username}/permission`
    const response: { data: { permission: string } } = await api.get(path)
    return response.data.permission as RepoPermissionLevel
  } catch (err) {
    console.log(err)
  }

  return 'none'
}
