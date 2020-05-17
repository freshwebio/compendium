import { useRef, RefObject, useState, useEffect } from 'react'

export interface CollapsibleViewElements<T extends HTMLElement> {
  viewRef: RefObject<T>
  showView: boolean
  setShowView: React.Dispatch<React.SetStateAction<boolean>>
  blockingState: boolean
  setBlockingState: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * Provides shared functionality for components in the UI with a collapsible view.
 *
 * Firstly, in this case collapsible represents a component that can be hidden or displayed explicitly
 * from interaction with the component itself.
 *
 * Secondly, a collapsible view means when you click outside of the component it will be hidden.
 *
 * Thirdly, a mechanism is provided to allow blocking users from collapsing a view for components like inline
 * editing fields that show their own loading indicator while data is being saved or something is happening.
 */
const useCollapsibleView = <
  T extends HTMLElement
>(): CollapsibleViewElements<T> => {
  const viewRef = useRef<T>(null)
  const [showView, setShowView] = useState<boolean>(false)
  // Provides an optional extra to allow components to provide a state that indicates
  // that the view cannot be collapsed as long as it is true.
  const [blockingState, setBlockingState] = useState<boolean>(false)

  const documentClick = (evt: any): void => {
    if (
      showView &&
      !blockingState &&
      viewRef.current &&
      !viewRef.current.contains(evt.target)
    ) {
      setShowView(false)
    }
  }

  useEffect((): (() => void) => {
    document.addEventListener('mousedown', documentClick)
    return (): void => {
      document.removeEventListener('mousedown', documentClick)
    }
  }, [showView, blockingState, viewRef.current])

  return { viewRef, showView, setShowView, blockingState, setBlockingState }
}

export default useCollapsibleView
