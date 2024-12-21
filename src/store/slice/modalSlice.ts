import { createSlice } from '@reduxjs/toolkit'

interface ModalState {
  isOutOfCreditsModal: boolean
  isOopsModal: boolean
  isSuccessModal: boolean
  isSuccessFeedbackModal: boolean
  isCheckoutSuccessModal: boolean
  isAuthModal: boolean
  isRecipientsModal: boolean
  isDeleteAccountModal: boolean
  isBackModal: boolean
  isPermissionsModal: boolean
  isOnboardingModal: boolean
  isOnboardingStepsModal: boolean
  isAppliedCouponModal: boolean
  isPermissionGrantedModal: boolean
}

const initialState: ModalState = {
  isOutOfCreditsModal: false,
  isOopsModal: false,
  isSuccessModal: false,
  isSuccessFeedbackModal: false,
  isCheckoutSuccessModal: false,
  isAuthModal: false,
  isRecipientsModal: false,
  isDeleteAccountModal: false,
  isBackModal: false,
  isPermissionsModal: false,
  isOnboardingModal: false,
  isOnboardingStepsModal: false,
  isAppliedCouponModal: false,
  isPermissionGrantedModal: false,
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setAuthModal: (state, action) => {
      state.isAuthModal = action.payload
    },
    setOutOfCreditsModal: (state, action) => {
      state.isOutOfCreditsModal = action.payload
    },
    setOopsModal: (state, action) => {
      state.isOopsModal = action.payload
    },
    setSuccessModal: (state, action) => {
      state.isSuccessModal = action.payload
    },
    setSuccessFeedbackModal: (state, action) => {
      state.isSuccessFeedbackModal = action.payload
    },
    setRecipientsModal: (state, action) => {
      state.isRecipientsModal = action.payload
    },
    setDeleteAccountModal: (state, action) => {
      state.isDeleteAccountModal = action.payload
    },
    setCheckoutSuccessModal: (state, action) => {
      state.isCheckoutSuccessModal = action.payload
    },
    setBackModal: (state, action) => {
      state.isBackModal = action.payload
    },
    setPermissionsModal: (state, action) => {
      state.isPermissionsModal = action.payload
    },
    setOnboardingModal: (state, action) => {
      state.isOnboardingModal = action.payload
    },
    setOnboardingStepsModal: (state, action) => {
      state.isOnboardingStepsModal = action.payload
    },
    setAppliedCouponModal: (state, action) => {
      state.isAppliedCouponModal = action.payload
    },
    setPermissionGrantedModal: (state, action) => {
      state.isPermissionGrantedModal = action.payload
    },
  },
})

export const {
  setAuthModal,
  setOutOfCreditsModal,
  setOopsModal,
  setSuccessModal,
  setSuccessFeedbackModal,
  setRecipientsModal,
  setDeleteAccountModal,
  setCheckoutSuccessModal,
  setBackModal,
  setPermissionsModal,
  setOnboardingModal,
  setOnboardingStepsModal,
  setAppliedCouponModal,
  setPermissionGrantedModal,
} = modalSlice.actions
export default modalSlice.reducer
