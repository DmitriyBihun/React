import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { logout } from '../../features/auth/api/authSlice'
import { useRefreshMutation } from '../../features/auth/api/authApi'
import { LanguageSync } from '../../shared/lib/LanguageSync'

export function AppInit({ children }) {
  const dispatch = useDispatch()
  const [refresh] = useRefreshMutation()
  const [isAuthChecked, setIsAuthChecked] = useState(false)

  useEffect(() => {
    const auth = getAuth()

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          await refresh().unwrap()
          console.log('REFRESH DONE - user authenticated')
        } catch (error) {
          console.log('REFRESH FAILED -', error)
          dispatch(logout())
        }
      } else {
        console.log('NO USER - logout')
        dispatch(logout())
      }
      setIsAuthChecked(true)
    })

    return () => unsubscribe()
  }, [dispatch, refresh])

  console.log('AppInit - isAuthChecked:', isAuthChecked)

  if (!isAuthChecked) {
    return <div>Loading application...</div>
  }

  return (
    <>
      <LanguageSync /> 
      {children}
    </>
  )
}