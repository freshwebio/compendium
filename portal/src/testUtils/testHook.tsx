import React from 'react'
import { mount, ReactWrapper } from 'enzyme'

export interface TestHookProps {
  callback: any
}

const TestHook: React.FunctionComponent<TestHookProps> = ({
  callback,
}): React.ReactElement | null => {
  callback()
  return null
}

export const testHook = (callback: any): void => {
  mount(<TestHook callback={callback} />)
}

export interface TestHookWithRefProps {
  callback: (...args: any[]) => any
  refName: string
}

const TestHookWithRef: React.FunctionComponent<TestHookWithRefProps> = ({
  callback,
  refName,
}): React.ReactElement | null => {
  const result = callback()
  return <div id="hookWithRefElem" ref={result[refName]} />
}

export const testHookWithRef = (
  callback: (...args: any[]) => any,
  refPropName: string
): ReactWrapper<any> => {
  return mount(<TestHookWithRef callback={callback} refName={refPropName} />, {
    attachTo: document.getElementById('root'),
  })
}
