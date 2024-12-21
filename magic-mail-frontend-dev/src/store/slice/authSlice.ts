import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import {
  appleCallback,
  getCheckAuth,
  getSignOut,
  getUser,
  googleCallback,
  User,
} from '../../lib/api/auth'
import { getAccessToken, removeAccessToken, setAccessToken, setIsRegistered } from '../../lib/services/asyncStorage'
import { setOopsModal } from './modalSlice'
import { clearFormData } from './formDataSlice'
import { clearEmailContent } from './testEmailSlice'

interface AuthState {
  user: User | null
  loading: boolean
  isSignedIn: boolean
  error: string
}

const initialState: AuthState = {
  user: null,
  isSignedIn: false,
  loading: false,
  error: '',
}

export const checkSignIn = createAsyncThunk('auth/checkSignIn', async (_, { dispatch }) => {
  try {
    const accessToken = getAccessToken()
    const response = await getCheckAuth()

    if (response?.status === 200 && !!accessToken) {
      return true
    }
    if (response?.status === 401) {
      dispatch(signOut())
    }
    return false
  } catch (e) {
    const error = e as Error | AxiosError
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data.message)
    } else {
      console.log(error.message)
    }
    return false
  }
})

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (
    { type, code, token }: { type: 'google' | 'apple'; code: string; token?: string },
    { dispatch },
  ) => {
    try {
      let response
      if (type === 'apple' && token) {
        response = await appleCallback(code, token)
      } else {
        response = await googleCallback(code)
      }
      if (response?.status === 200) {
        setAccessToken(response.data.token)
        setIsRegistered(true)
        return !!response.data.token
      }
      return false
    } catch (e) {
      dispatch(setOopsModal(true))
      const error = e as Error | AxiosError
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data.message)
      } else {
        console.log(error.message)
      }
      return false
    }
  },
)

export const fetchUser = createAsyncThunk('auth/fetchUser', async () => {
  try {
    const response = await getUser()
    if (response?.status === 200) {
      return response.data
    }
    return null
  } catch (e) {
    const error = e as Error | AxiosError
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data.message)
    } else {
      console.log(error.message)
    }
    return null
  }
})

export const signOut = createAsyncThunk('auth/signOut', async (_, { dispatch }) => {
  try {
    const response = await getSignOut()
    if (response?.status === 200) {
      dispatch(clearFormData())
      dispatch(clearEmailContent())
      removeAccessToken()
      return false
    }
    return true
  } catch (e) {
    dispatch(setOopsModal(true))
    const error = e as Error | AxiosError
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data.message)
    } else {
      console.log(error.message)
    }
    return true
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthData() {
      return initialState
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true
        state.error = ''
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false
        state.isSignedIn = action.payload
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Error on signing in'
      })
      .addCase(fetchUser.pending, (state) => {
        state.loading = true
        state.error = ''
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Error on fetching user'
      })
      .addCase(signOut.pending, (state) => {
        state.loading = true
        state.error = ''
      })
      .addCase(signOut.fulfilled, (state, action) => {
        state.loading = false
        state.isSignedIn = action.payload
        state.user = null
      })
      .addCase(signOut.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Error on signing uot'
      })
      .addCase(checkSignIn.fulfilled, (state, action) => {
        state.isSignedIn = action.payload
      })
      .addCase(checkSignIn.rejected, (state, action) => {
        state.error = action.error.message || 'Error on checking sign in'
      })
  },
})

export const { clearAuthData } = authSlice.actions

export default authSlice.reducer
