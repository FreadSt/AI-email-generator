import { createSlice } from '@reduxjs/toolkit'
import { generateEmailContent } from '../thunk/testEmailGenerate'

interface EmailContent {
  html: string
  id: string
  subject: string
}

interface TestEmailState {
  emailContent: EmailContent | null
  loading: boolean
  error: string | null
}

const initialState: TestEmailState = {
  emailContent: null,
  loading: false,
  error: null,
}

const testEmailSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {
    clearEmailContent() {
      return initialState
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateEmailContent.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(generateEmailContent.fulfilled, (state, action) => {
        state.loading = false
        state.emailContent = action.payload
      })
      .addCase(generateEmailContent.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string | null
      })
  },
})

export const { clearEmailContent } = testEmailSlice.actions

export default testEmailSlice.reducer
