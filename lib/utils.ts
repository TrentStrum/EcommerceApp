import { useState, useEffect } from 'react'

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export async function fetchWithCache(url: string, options?: RequestInit) {
  const cacheKey = `cache_${url}`
  const cachedResponse = sessionStorage.getItem(cacheKey)

  if (cachedResponse) {
    return JSON.parse(cachedResponse)
  }

  const response = await fetch(url, options)
  const data = await response.json()

  sessionStorage.setItem(cacheKey, JSON.stringify(data))

  return data
}

