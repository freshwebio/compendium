import { RSAA } from 'redux-api-middleware'
import { COMMIT_CHANGES } from 'appredux/actions/editor/types'
import { Middleware, Dispatch, AnyAction } from 'redux'
import { DispatchFunction, MiddlewareFunction } from './types'
import { ADD_GROUP, ADD_SERVICE } from 'appredux/actions/entities/types'

const githubAPIRequestActionTypes: string[] = [
  COMMIT_CHANGES,
  ADD_GROUP,
  ADD_SERVICE,
]

const isGithubAPICall = (rsaa: any): boolean => {
  const type =
    typeof rsaa.types[0] === 'object' ? rsaa.types[0].type : rsaa.types[0]
  return githubAPIRequestActionTypes.includes(type)
}

const githubApiInjector: Middleware = (): MiddlewareFunction => (
  next: Dispatch<AnyAction>
): DispatchFunction => (action: any): any => {
  const rsaa = action[RSAA]

  // Check if this action is a redux-api-middleware action.
  if (rsaa && isGithubAPICall(rsaa)) {
    rsaa.endpoint = `https://api.github.com/repos/${
      process.env.REACT_APP_API_DOCS_REPO_OWNER
    }/${process.env.REACT_APP_API_DOCS_REPO}${rsaa.endpoint}`
    // Inject the Authorization header from sessionStorage.

    rsaa.headers = Object.assign({}, rsaa.headers, {
      Authorization: `Bearer ${sessionStorage.getItem(
        process.env.REACT_APP_TOKEN_NAME || 'apydox-token'
      ) || ''}`,
    })
  }

  // Pass the FSA to the next action.
  return next(action)
}

export default githubApiInjector
