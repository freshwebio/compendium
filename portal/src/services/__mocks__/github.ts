export const loadServiceDefinition = jest.fn(
  (service): Promise<any> => {
    if (service === 'Service2') {
      return Promise.resolve({
        content: 'This is the specification for Service2',
        sha: 'QFAsfd0432412312fGsdf',
      })
    }
    return Promise.resolve({
      content: 'This is an example specification',
      sha: 'dfsfd0432412312fGsdf',
    })
  }
)

export const getApiDefs = jest.fn(
  (): Promise<any[]> =>
    Promise.resolve([
      {
        name: 'Core Services',
        id: 'core-services',
        definitions: [
          { path: 'core-services/Service1.yaml', type: 'blob' },
          { path: 'core-services/Service2.yaml', type: 'blob' },
        ],
      },
      {
        name: 'Integration Services',
        id: 'integration-services',
        definitions: [
          {
            path: 'integration-services/IntegrationService1.yaml',
            type: 'blob',
          },
          {
            path: 'integration-services/IntegrationService2.yaml',
            type: 'blob',
          },
          {
            path: 'integration-services/IntegrationService3.yaml',
            type: 'blob',
          },
        ],
      },
    ])
)
