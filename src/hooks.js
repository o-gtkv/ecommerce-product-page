import { useEffect } from "react"

export function useEventHandler(element, event, callback) {
    useEffect(() => {
        element.addEventListener(event, callback)
        return () => element.removeEventListener(event, callback)
    })
}