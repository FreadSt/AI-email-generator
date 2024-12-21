import { configureStore, combineReducers } from '@reduxjs/toolkit'
import formReducer from './slice/formDataSlice'
import emailReducer from './slice/emailSlice'
import layoutReducer from './slice/layoutSlice'
import testEmailReducer from './slice/testEmailSlice'
import authReducer from './slice/authSlice'
import galleryReducer from './slice/gallerySlice'
import modalReducer from './slice/modalSlice'
import paginationReducer from './slice/paginationSlice'
import pricingReducer from './slice/pricingSlice'
import onboardingReducer from './slice/onboardingSlice'
import mobileMenuReducer from './slice/mobileMenuSlice'
import { useDispatch } from 'react-redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
  formData: formReducer,
  email: emailReducer,
  layout: layoutReducer,
  testEmail: testEmailReducer,
  auth: authReducer,
  gallery: galleryReducer,
  modal: modalReducer,
  pagination: paginationReducer,
  pricing: pricingReducer,
  onboarding: onboardingReducer,
  mobileMenu: mobileMenuReducer,
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'formData', 'testEmail', 'onboarding'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
