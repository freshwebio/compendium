import 'react-test-renderer'

declare module 'react-test-renderer' {
  /**
   * As per react 16.8.x type but with async support provided in 16.9.x.
   */
  export function act(
    callback: () => void | Promise<void> | undefined
  ): DebugPromiseLike | {}
}
