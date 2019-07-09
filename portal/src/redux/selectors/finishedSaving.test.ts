import makeSelector from './finishedSaving'

describe('finishedSaving selector', (): void => {
  it('should derive a value that reports that entities are currently being saved when a group is being added', (): void => {
    expect(
      makeSelector()(
        {
          entities: {
            isAddingGroup: true,
            addingServiceStates: { service1: false },
          },
        },
        {}
      )
    ).toBeFalse()
  })

  it('should derive a value that reports that entities are currently being saved when a service is being added to a group', (): void => {
    expect(
      makeSelector()(
        {
          entities: {
            isAddingGroup: false,
            addingServiceStates: { service1: true, service2: false },
          },
        },
        {}
      )
    ).toBeFalse()
  })

  it('should derive a value that reports that all entities have finished saving', (): void => {
    expect(
      makeSelector()(
        {
          entities: {
            isAddingGroup: false,
            addingServiceStates: {
              service1: false,
              service2: false,
              service3: false,
            },
          },
        },
        {}
      )
    ).toBeTrue()
  })
})
