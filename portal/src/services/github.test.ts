import nock from 'nock'
import { getApiDefs, loadServiceDefinition } from './github'

describe('github api interactions', (): void => {
  afterEach(
    (): void => {
      nock.cleanAll()
    }
  )

  describe('#getApiDefs()', (): void => {
    it('should load api definitions and exclude directories without api definitions', async (): Promise<
      void
    > => {
      nock('https://api.github.com')
        .get('/repos/freshwebio/test-content/branches/master')
        .reply(200, { commit: { sha: 'fsdf2403fsdf3493ds' } })
        .options('/repos/freshwebio/test-content/branches/master')
        .reply(200, null, {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Authorization',
        })
        .get(
          '/repos/freshwebio/test-content/git/trees/fsdf2403fsdf3493ds?recursive=1'
        )
        .reply(200, {
          tree: [
            { path: 'extra-services', type: 'tree' },
            { path: 'core-services', type: 'tree' },
            { path: 'core-services/Configuration.yaml', type: 'blob' },
            { path: 'core-services/Events.yml', type: 'blob' },
            { path: 'user-services', type: 'tree' },
            { path: 'user-services/Auth.yaml', type: 'blob' },
            { path: 'user-services/User.yml', type: 'blob' },
          ],
        })
        .options(
          '/repos/freshwebio/test-content/git/trees/fsdf2403fsdf3493ds?recursive=1'
        )
        .reply(200, null, {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Authorization',
        })

      process.env.REACT_APP_API_DOCS_REPO_OWNER = 'freshwebio'
      process.env.REACT_APP_API_DOCS_REPO = 'test-content'
      const apiDefs = await getApiDefs()
      expect(apiDefs).toEqual([
        {
          name: 'Core services',
          id: 'core-services',
          definitions: [
            { path: 'core-services/Configuration.yaml', type: 'blob' },
            { path: 'core-services/Events.yml', type: 'blob' },
          ],
        },
        {
          name: 'User services',
          id: 'user-services',
          definitions: [
            { path: 'user-services/Auth.yaml', type: 'blob' },
            { path: 'user-services/User.yml', type: 'blob' },
          ],
        },
      ])
    })
  })

  describe('#loadServiceDefinition()', (): void => {
    it('should load the service definition for the specified service', async (): Promise<
      void
    > => {
      nock('https://api.github.com')
        .get(
          '/repos/freshwebio/test-content/contents/core-services/Events.yaml?ref=master'
        )
        .reply(200, {
          content: btoa('This is the content for the specification'),
          sha: 'fsdf2403fsdf3493ds',
        })
        .options(
          '/repos/freshwebio/test-content/contents/core-services/Events.yaml?ref=master'
        )
        .reply(200, null, {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Authorization',
        })

      process.env.REACT_APP_API_DOCS_REPO_OWNER = 'freshwebio'
      process.env.REACT_APP_API_DOCS_REPO = 'test-content'

      const serviceDefinition = await loadServiceDefinition(
        'core-services::Events'
      )
      expect(serviceDefinition.content).toBe(
        'This is the content for the specification'
      )
      expect(serviceDefinition.sha).toBe('fsdf2403fsdf3493ds')
    })

    it('should fail to load the service definition and return the default result', async (): Promise<
      void
    > => {
      nock('https://api.github.com')
        .get(
          '/repos/freshwebio/test-content/contents/core-services/Events.yaml?ref=master'
        )
        .reply(400, {
          message: 'Bad request',
        })
        .options(
          '/repos/freshwebio/test-content/contents/core-services/Events.yaml?ref=master'
        )
        .reply(200, null, {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Authorization',
        })

      process.env.REACT_APP_API_DOCS_REPO_OWNER = 'freshwebio'
      process.env.REACT_APP_API_DOCS_REPO = 'test-content'

      const serviceDefinition = await loadServiceDefinition(
        'core-services::Events'
      )
      expect(serviceDefinition).toEqual({ content: '', sha: '' })
    })
  })
})
