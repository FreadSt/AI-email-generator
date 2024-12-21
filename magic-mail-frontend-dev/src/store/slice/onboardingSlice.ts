import { createSlice } from '@reduxjs/toolkit'

interface OnboardingState {
  isShowPromptOnboarding: boolean
  isShowStyleOnboarding: boolean
  isShowSendOnboarding: boolean
  isFinishedPromptOnboarding: boolean
  isFinishedStyleOnboarding: boolean
  isFinishedSendOnboarding: boolean
}

const initialState: OnboardingState = {
  isShowPromptOnboarding: false,
  isShowStyleOnboarding: false,
  isShowSendOnboarding: false,
  isFinishedPromptOnboarding: false,
  isFinishedStyleOnboarding: false,
  isFinishedSendOnboarding: false,
}

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setPromptOnboarding: (state, action) => {
      state.isShowPromptOnboarding = action.payload
    },
    setStyleOnboarding: (state, action) => {
      state.isShowStyleOnboarding = action.payload
    },
    setSendOnboarding: (state, action) => {
      state.isShowSendOnboarding = action.payload
    },
    setFinishedPromptOnboarding: (state, action) => {
      state.isFinishedPromptOnboarding = action.payload
    },
    setFinishedStyleOnboarding: (state, action) => {
      state.isFinishedStyleOnboarding = action.payload
    },
    setFinishedSendOnboarding: (state, action) => {
      state.isFinishedSendOnboarding = action.payload
    },
  },
})

export const {
  setPromptOnboarding,
  setStyleOnboarding,
  setSendOnboarding,
  setFinishedPromptOnboarding,
  setFinishedStyleOnboarding,
  setFinishedSendOnboarding,
} = onboardingSlice.actions
export default onboardingSlice.reducer
