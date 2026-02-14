import { createSlice, isAnyOf } from '@reduxjs/toolkit'
import { authApi } from './authApi'

const initialState = {
  user: null,

  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload.user
    },
    logout(state) {
      state.user = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(
          authApi.endpoints.login.matchPending,
          authApi.endpoints.googleLogin.matchPending,
          authApi.endpoints.signUp.matchPending
        ),
        (state) => {
          state.loading = true
          state.error = null
        }
      )
      .addMatcher(
        isAnyOf(
          authApi.endpoints.login.matchFulfilled,
          authApi.endpoints.refresh.matchFulfilled,
          authApi.endpoints.googleLogin.matchFulfilled,
          authApi.endpoints.signUp.matchFulfilled
        ),
        (state, action) => {
          state.loading = false
          state.user = action.payload
        }
      )
      .addMatcher(
        isAnyOf(
          authApi.endpoints.login.matchRejected,
          authApi.endpoints.refresh.matchRejected,
          authApi.endpoints.googleLogin.matchRejected,
          authApi.endpoints.signUp.matchRejected
        ),
        (state, action) => {
          state.loading = false
          state.error = action.error?.message || 'Auth error'
        }
      )
      .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
        state.user = null
      })
  },
})

// Селектор для користувача
export const selectAuthUser = (state) => state.auth.user
export const selectAuthLoading = (state) => state.auth.loading
export const selectAuthError = (state) => state.auth.error

export const { setUser, logout } = authSlice.actions
export default authSlice.reducer
