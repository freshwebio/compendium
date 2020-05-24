import nock from 'nock'
import { getApiDefs, loadServiceDefinition, getPermissionLevel } from './github'
import defaultSpec from 'utils/defaultSpec'

describe('github api interactions', (): void => {
  afterEach((): void => {
    nock.cleanAll()
    localStorage.clear()
  })

  describe('#getApiDefs()', (): void => {
    it('should load api definitions and provide a list of empty defintions for directories without any api definition documents', async (): Promise<
      void
    > => {
      nock('https://api.github.com')
        .get('/repos/freshwebio/test-content/branches/master')
        .reply(200, { commit: { sha: 'fsdf2403fsdf3493ds' } })
        .options('/repos/freshwebio/test-content/branches/master')
        .reply(200, undefined, {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Authorization,If-None-Match',
        })
        .get(
          '/repos/freshwebio/test-content/git/trees/fsdf2403fsdf3493ds?recursive=1'
        )
        .reply(200, {
          tree: [
            { path: 'extra-services', type: 'tree' },
            { path: 'extra-services-2', type: 'tree' },
            { path: 'extra-services-2/.gitkeep', type: 'blob' },
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
        .reply(200, undefined, {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Authorization,If-None-Match',
        })

      process.env.REACT_APP_API_DOCS_REPO_OWNER = 'freshwebio'
      process.env.REACT_APP_API_DOCS_REPO = 'test-content'
      const apiDefs = await getApiDefs()
      expect(apiDefs).toEqual([
        {
          name: 'Extra services',
          id: 'extra-services',
          definitions: [],
        },
        {
          name: 'Extra services 2',
          id: 'extra-services-2',
          definitions: [],
        },
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

    it('should load api definitions from local storage for demo mode with default demo mode data', async (): Promise<
      void
    > => {
      process.env.REACT_APP_DEMO_MODE = 'true'
      process.env.REACT_APP_API_DOCS_REPO_OWNER = 'freshwebio'
      process.env.REACT_APP_API_DOCS_REPO = 'test-content'
      const apiDefs = await getApiDefs('master', true)
      expect(apiDefs).toEqual([
        {
          definitions: [
            { path: 'demo-services/User-Service.yaml', type: 'blob' },
          ],
          id: 'demo-services',
          name: 'Demo services',
        },
      ])
      delete process.env.REACT_APP_DEMO_MODE
    })

    it('should load api definitions from local storage for demo mode with data saved by user', async (): Promise<
      void
    > => {
      process.env.REACT_APP_DEMO_MODE = 'true'
      process.env.REACT_APP_API_DOCS_REPO_OWNER = 'freshwebio'
      process.env.REACT_APP_API_DOCS_REPO = 'test-content'
      localStorage.setItem(
        `https://api.github.com/repos/freshwebio/test-content/contents/demo2-services/Events.yaml`,
        JSON.stringify({
          content: btoa('This is spec 1 content'),
          sha: 'sdgfsdfdfsdf',
        })
      )
      localStorage.setItem(
        `https://api.github.com/repos/freshwebio/test-content/contents/demo2-services/Order-Service.yaml`,
        JSON.stringify({
          content: btoa('This is spec 2 content'),
          sha: 'sdgfsdfdfsdf',
        })
      )
      localStorage.setItem(
        `https://api.github.com/repos/freshwebio/test-content/contents/demo3-services/Shipping-Service.yaml`,
        JSON.stringify({
          content: btoa('This is spec 3 content'),
          sha: 'sdgfsdfdfsdf',
        })
      )

      const apiDefs = await getApiDefs('master', true)
      expect(apiDefs).toEqual([
        {
          definitions: [
            { path: 'demo2-services/Events.yaml', type: 'blob' },
            { path: 'demo2-services/Order-Service.yaml', type: 'blob' },
          ],
          id: 'demo2-services',
          name: 'Demo2 services',
        },
        {
          definitions: [
            { path: 'demo3-services/Shipping-Service.yaml', type: 'blob' },
          ],
          id: 'demo3-services',
          name: 'Demo3 services',
        },
      ])
      delete process.env.REACT_APP_DEMO_MODE
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
        .reply(200, undefined, {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Authorization,If-None-Match',
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
        .reply(200, undefined, {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Authorization,If-None-Match',
        })

      process.env.REACT_APP_API_DOCS_REPO_OWNER = 'freshwebio'
      process.env.REACT_APP_API_DOCS_REPO = 'test-content'

      const serviceDefinition = await loadServiceDefinition(
        'core-services::Events'
      )
      expect(serviceDefinition).toEqual({ content: '', sha: '' })
    })

    it('should load a service definition from local storage for demo mode from default data', async (): Promise<
      void
    > => {
      process.env.REACT_APP_DEMO_MODE = 'true'
      process.env.REACT_APP_API_DOCS_REPO_OWNER = 'freshwebio'
      process.env.REACT_APP_API_DOCS_REPO = 'test-content'
      const serviceDefinition = await loadServiceDefinition(
        'demo-services::User-Service',
        'master',
        true
      )
      expect(serviceDefinition).toEqual({
        content: defaultSpec,
        sha: 'demogsdsg0sdg9839asfasdsha',
      })
      delete process.env.REACT_APP_DEMO_MODE
    })

    it('should load a service definition from local storage for demo mode from user-created data', async (): Promise<
      void
    > => {
      process.env.REACT_APP_DEMO_MODE = 'true'
      process.env.REACT_APP_API_DOCS_REPO_OWNER = 'freshwebio'
      process.env.REACT_APP_API_DOCS_REPO = 'test-content'

      localStorage.setItem(
        `https://api.github.com/repos/freshwebio/test-content/contents/demo21-services/Orders.yaml`,
        JSON.stringify({
          content: btoa('This is a test spec'),
          sha: 'demosha2',
        })
      )

      const serviceDefinition = await loadServiceDefinition(
        'demo21-services::Orders',
        'master',
        true
      )
      expect(serviceDefinition).toEqual({
        content: 'This is a test spec',
        sha: 'demosha2',
      })
      delete process.env.REACT_APP_DEMO_MODE
    })
  })

  describe('#getPermissionLevel()', (): void => {
    it('should correctly produce the correct permission level for the current user', async (): Promise<
      void
    > => {
      nock('https://api.github.com')
        .get(
          '/repos/freshwebio/test-content/collaborators/test-user/permission'
        )
        .reply(200, {
          permission: 'write',
        })
        .options(
          '/repos/freshwebio/test-content/collaborators/test-user/permission'
        )
        .reply(200, undefined, {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Authorization,If-None-Match',
        })

      process.env.REACT_APP_API_DOCS_REPO_OWNER = 'freshwebio'
      process.env.REACT_APP_API_DOCS_REPO = 'test-content'

      const permission = await getPermissionLevel('test-user')
      expect(permission).toBe('write')
    })

    it('should return full access for a user in demo mode', async (): Promise<
      void
    > => {
      nock('https://api.github.com')
        .get(
          '/repos/freshwebio/test-content/collaborators/test-user/permission'
        )
        .reply(200, {
          permission: 'none',
        })
        .options(
          '/repos/freshwebio/test-content/contents/core-services/Events.yaml?ref=master'
        )
        .reply(200, undefined, {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Authorization,If-None-Match',
        })

      process.env.REACT_APP_DEMO_MODE = 'true'
      process.env.REACT_APP_API_DOCS_REPO_OWNER = 'freshwebio'
      process.env.REACT_APP_API_DOCS_REPO = 'test-content'

      const permission = await getPermissionLevel('test-user', true)
      expect(permission).toBe('admin')

      delete process.env.REACT_APP_DEMO_MODE
    })
  })
})
