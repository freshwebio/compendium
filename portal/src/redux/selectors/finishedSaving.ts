import { createSelector } from 'reselect'
import { EntitiesState } from 'appredux/reducers/entities'

const groupLoadingSelector = (state: { entities: EntitiesState }): boolean =>
  state.entities.isAddingGroup

const serviceLoadingSelector = (state: {
  entities: EntitiesState
}): { [groupId: string]: boolean } => state.entities.addingServiceStates

export type FinishedSavingSelector = (state: any, props: any) => boolean

const makeFinishedSavingSelector = (): FinishedSavingSelector =>
  createSelector(
    groupLoadingSelector,
    serviceLoadingSelector,
    (
      isAddingGroup: boolean,
      addingServiceStates: { [groupId: string]: boolean }
    ): boolean =>
      !isAddingGroup &&
      !Object.values(addingServiceStates).reduce(
        (accum: boolean, addingService: boolean): boolean =>
          // Any true values in the map will invalidate
          // our result and return true indicating we haven't completely finished
          // saving entities.
          accum || addingService,
        false
      )
  )

export default makeFinishedSavingSelector
