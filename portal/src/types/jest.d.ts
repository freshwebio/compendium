declare namespace jest {
  interface Matchers<R> {
    toContainObject(object: any): CustomMatcherResult
  }
}
