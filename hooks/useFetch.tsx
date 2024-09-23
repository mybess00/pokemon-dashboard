import { useState, useEffect, useCallback } from 'react'

export function useFetch<T>(url: string, options: RequestInit = {}) {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(url, options)

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }

      const result: T = await response.json()
      setData(result)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }, [url, options])

  useEffect(() => {
    fetchData()
  }, [])

  const update = () => {
    fetchData()
  }

  return { data, error, isLoading, update }
}
