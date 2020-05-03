const store = new Map<string, any>()
const initialSpecEntry: Readonly<[string, any]> = ['spec', '']
store.set(
  'spec',
  new Map<string, any>([initialSpecEntry])
)

export default jest.fn((): any => {
  return {
    specActions: {
      updateSpec: jest.fn((spec: string): void => {
        const specEntry: Readonly<[string, any]> = ['spec', spec]
        store.set(
          'spec',
          new Map<string, any>([specEntry])
        )
      }),
    },
    getStore: jest.fn((): any => ({
      subscribe: jest.fn((listener): any => {
        // Simulate subscription to store by polling every 50 milliseconds for changes.
        const interval = setInterval((): void => {
          if (store.get('spec').get('spec') !== '') {
            listener()
          }
        }, 50)
        return (): void => {
          clearInterval(interval)
        }
      }),
      getState: jest.fn(
        (): Map<string, any> => {
          return store
        }
      ),
    })),
  }
})
