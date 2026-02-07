import { useEffect } from 'react'

import { useDispatch } from 'react-redux'
import { useRefreshMutation } from '@/features/auth'

export function AppInit() {
  const [refresh] = useRefreshMutation()
  const dispatch = useDispatch()

  useEffect(() => {
    const init = async () => {
      try {
        await refresh().unwrap()
      } catch (e) {
        console.log('---->>> e?.status')
        console.log(e?.status)

        // Не показуємо помилку в консолі, якщо це 401
        if (e?.status !== 401) {
          console.error(e)
        }
      }
    }
    init()
  }, [refresh, dispatch])

  return null
}
