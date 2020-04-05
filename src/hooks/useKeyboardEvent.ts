// import { useEffect } from 'react'

// export const useKeyboardEvent = (key: string, callback: Function) => {
//     useEffect(() => {
//         const handler = (event: KeyboardEvent) => {
//             if (event.key === key) callback()
//         }

//         window.addEventListener('keydown', handler)

//         return () => window.removeEventListener('keydown', handler)
//     })
// }

import hotkeys from 'hotkeys-js'
import { DependencyList, useEffect, useCallback } from 'react'

export const useKeyboardEvent = (
    key: string | false,
    callback: (event: KeyboardEvent) => void,
    deps: DependencyList = [],
) => {
    const memoisedCallback = useCallback(callback, deps)

    useEffect(() => {
        if (!key) return

        hotkeys(key, memoisedCallback)

        return () => hotkeys.unbind(key, memoisedCallback)
    }, [key, memoisedCallback])
}
