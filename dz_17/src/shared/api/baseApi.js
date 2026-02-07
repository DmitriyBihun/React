import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://backend-17-3ths.onrender.com/api/',
  credentials: 'include',
  prepareHeaders: (headers, { getState, extra }) => {
    // Якщо skipAuth не вказано або false — додаємо токен
    if (!extra?.skipAuth) {
      const token = getState().auth?.accessToken
      if (token) headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  },
})

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQuery,
  tagTypes: ['User', 'Post', 'Comment'],
  endpoints: () => ({}),
})
