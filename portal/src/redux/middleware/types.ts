import { Dispatch, AnyAction } from 'redux'

export type DispatchFunction = (action: any) => any

export type MiddlewareFunction = (next: Dispatch<AnyAction>) => DispatchFunction
