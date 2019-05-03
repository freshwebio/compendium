import { useRef, RefObject, useState, useEffect } from 'react'

export interface CollapsibleViewElements {
  viewRef: RefObject<HTMLDivElement>
  showView: boolean
  setShowView: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * Provides shared functionality for components in the UI with a collapsible view.
 *
 * Firstly, in this case collapsible represents a component that can be hidden or displayed explicitly
 * from interaction with the component itself.
 *
 * Secondly, a collapsible view means when you click outside of the component it will be hidden.
 *
 * One restriction in using this hook is that an element the viewRef is assigned to must be a div.
 */
const useCollapsibleView = (): CollapsibleViewElements => {
  const viewRef = useRef<HTMLDivElement>(null)
  const [showView, setShowView] = useState<boolean>(false)

  const documentClick = (evt: any): void => {
    if (showView && viewRef.current && !viewRef.current.contains(evt.target)) {
      setShowView(false)
    }
  }

  useEffect((): (() => void) => {
    document.addEventListener('mousedown', documentClick)
    return (): void => {
      document.removeEventListener('mousedown', documentClick)
    }
  }, [showView, viewRef.current])

  return { viewRef, showView, setShowView }
}

export default useCollapsibleView
