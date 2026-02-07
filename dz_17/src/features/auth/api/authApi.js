import { baseApi } from '@/shared/api/baseApi'
import { apiRoutes } from '@/shared/config/routes/apiRoutes'

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (credentials) => ({
        url: apiRoutes.auth.login,
        method: 'POST',
        body: credentials,
      }),
      extraOptions: { skipAuth: true },
    }),
    logout: build.mutation({
      query: () => ({
        url: apiRoutes.auth.logout,
        method: 'POST',
      }),
      extraOptions: { skipAuth: true },
    }),
    refresh: build.mutation({
      query: () => ({
        url: apiRoutes.auth.refresh,
        method: 'POST',
      }),
      extraOptions: { skipAuth: true },
    }),
  }),
})

export const {
  useLoginMutation,
  useLogoutMutation,
  useRefreshMutation,
  useGetProfileQuery,
} = authApi
