import { useEffect, useState } from 'react'

export default function useFetch(url, { skip = false } = {}) {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (skip) return

    async function fetchData() {
      try {
        setIsLoading(true)
        setError(null)
        const res = await fetch(url)
        const data = await res.json()
        setData(data)
      } catch (err) {
        setError(err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [url, skip])

  return {
    data,
    isLoading,
    error,
  }
}
