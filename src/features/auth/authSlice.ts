import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface AuthUser {
  id: string
  name: string
  email: string
}

export interface AuthState {
  user: AuthUser | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart(state) {
      state.isLoading = true
      state.error = null
    },
    loginSuccess(state, action: PayloadAction<{ user: AuthUser; token: string }>) {
      state.isLoading = false
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
      state.error = null
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.isLoading = false
      state.error = action.payload
      state.isAuthenticated = false
    },
    logout(state) {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.isLoading = false
      state.error = null
    },
    clearError(state) {
      state.error = null
    },
    // Legacy action for backward compatibility
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload
      state.isAuthenticated = !!action.payload
    },
  },
})

export const { 
  loginStart, 
  loginSuccess, 
  loginFailure, 
  logout, 
  clearError,
  setToken 
} = authSlice.actions

export default authSlice.reducer
