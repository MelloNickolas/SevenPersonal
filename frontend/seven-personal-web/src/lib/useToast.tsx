import { useCallback, useState } from 'react'

export function useToast() {
  const [message, setMessage] = useState<string | null>(null)

  const showToast = useCallback((msg: string) => {
    setMessage(msg)
    window.setTimeout(() => setMessage(null), 2600)
  }, [])

  const Toast = () => (message ? <div className="toast">{message}</div> : null)

  return { showToast, Toast }
}
