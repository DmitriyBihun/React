import axios from 'axios'
import { useCallback, useState } from 'react'
import apiRoutes from '../api/apiRoutes'

const useTeachersApi = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchTeachers = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await axios.get(apiRoutes.getAllTeachers)
      setData(res.data)
    } catch (error) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    data,
    isLoading,
    error,
    fetchTeachers,
  }
}

export default useTeachersApi
