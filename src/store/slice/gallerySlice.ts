import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import { Email, getAllEmails, getMeEmails } from '../../lib/api/email'

interface GalleryState {
  allEmails: Email[]
  myEmails: Email[]
  loading: boolean
  error: string
}

const initialState: GalleryState = {
  allEmails: [],
  myEmails: [],
  loading: false,
  error: '',
}

export const fetchMyEmails = createAsyncThunk('gallery/fetchMyEmails', async () => {
  try {
    const response = await getMeEmails()
    if (response?.status === 200) {
      return response.data
    }
    return []
  } catch (e) {
    const error = e as Error | AxiosError
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data.message)
    } else {
      console.log(error.message)
    }
    return []
  }
})

export const fetchAllEmails = createAsyncThunk('gallery/fetchAllEmails', async () => {
  try {
    const response = await getAllEmails()
    if (response?.status === 200) {
      return response.data
    }
    return []
  } catch (e) {
    const error = e as Error | AxiosError
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data.message)
    } else {
      console.log(error.message)
    }
    return []
  }
})

const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyEmails.pending, (state) => {
        state.loading = true
        state.error = ''
      })
      .addCase(fetchMyEmails.fulfilled, (state, action) => {
        state.loading = false
        state.myEmails = action.payload
      })
      .addCase(fetchMyEmails.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Error on fetching my emails'
      })
      .addCase(fetchAllEmails.pending, (state) => {
        state.loading = true
        state.error = ''
      })
      .addCase(fetchAllEmails.fulfilled, (state, action) => {
        state.loading = false
        state.allEmails = action.payload
      })
      .addCase(fetchAllEmails.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Error on fetching all emails'
      })
  },
})

export default gallerySlice.reducer
