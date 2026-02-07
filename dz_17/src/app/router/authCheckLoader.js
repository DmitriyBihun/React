import { redirect } from 'react-router'

import { store } from '../store/store'

import { authApi, tokenRefreshed } from '@/features/auth'

export const authCheckLoader =
  ({ refreshMutex }) =>
  async (route) => {
    // Визначаємо meta для поточного маршруту
    const meta = route?.meta

    // Базова структура даних, що повертається
    let user = store.getState()?.auth?.user

    const loaderData = {
      user,
      isAuthenticated: !!user,
    }

    // Перевірка прав доступу до сторінки
    if (meta?.requireAuth) {
      // Перевіряємо, чи не виконується вже оновлення токену
      if (refreshMutex.isLocked()) {
        await refreshMutex.waitForUnlock()
        user = store.getState()?.auth?.user
        loaderData.user = user
        loaderData.isAuthenticated = !!user
      }

      if (!user) {
        const release = await refreshMutex.acquire()
        try {
          const res = await store.dispatch(authApi.endpoints.refresh.initiate())
          if (res?.data?.user && res?.data?.accessToken) {
            store.dispatch(tokenRefreshed(res.data))
          }
          user = res?.data?.user
          loaderData.user = user
          loaderData.isAuthenticated = !!user
          if (!user) {
            throw redirect('/login')
          }
        } catch {
          throw redirect('/login')
        } finally {
          release()
        }
      }

      // Перевірка ролей
      if (
        meta.roles &&
        meta.roles.length > 0 &&
        (!user?.role || !meta.roles.includes(user.role))
      ) {
        throw redirect('/forbidden')
      }
    }

    return loaderData
  }
