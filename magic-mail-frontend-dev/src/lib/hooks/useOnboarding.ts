import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../store'
import {
  setFinishedPromptOnboarding,
  setFinishedSendOnboarding,
  setFinishedStyleOnboarding,
  setPromptOnboarding,
  setSendOnboarding,
  setStyleOnboarding,
} from '../../store/slice/onboardingSlice'

export const useOnboarding = () => {
  const dispatch = useAppDispatch()
  const {
    isShowPromptOnboarding,
    isShowStyleOnboarding,
    isShowSendOnboarding,
    isFinishedSendOnboarding,
    isFinishedPromptOnboarding,
    isFinishedStyleOnboarding,
  } = useSelector((state: RootState) => state.onboarding)

  const updatePromptOnboarding = (value: boolean) => {
    dispatch(setPromptOnboarding(value))
  }

  const updateStyleOnboarding = (value: boolean) => {
    dispatch(setStyleOnboarding(value))
  }

  const updateSendOnboarding = (value: boolean) => {
    dispatch(setSendOnboarding(value))
  }

  const showPromptOnboarding = () => {
    updatePromptOnboarding(true)
    updateStyleOnboarding(false)
    updateSendOnboarding(false)
  }

  const showStyleOnboarding = () => {
    updatePromptOnboarding(false)
    updateStyleOnboarding(true)
    updateSendOnboarding(false)
  }

  const showSendOnboarding = () => {
    updatePromptOnboarding(false)
    updateStyleOnboarding(false)
    updateSendOnboarding(true)
  }

  const hideAllOnboardings = () => {
    updatePromptOnboarding(false)
    updateStyleOnboarding(false)
    updateSendOnboarding(false)
  }

  const finishPromptOnboarding = () => {
    updatePromptOnboarding(false)
    dispatch(setFinishedPromptOnboarding(true))
  }

  const finishStyleOnboarding = () => {
    updateStyleOnboarding(false)
    dispatch(setFinishedStyleOnboarding(true))
  }

  const finishSendOnboarding = () => {
    updateSendOnboarding(false)
    dispatch(setFinishedSendOnboarding(true))
  }

  const finishAllOnboardings = () => {
    finishPromptOnboarding()
    finishStyleOnboarding()
    finishSendOnboarding()
  }

  return {
    isShowPromptOnboarding,
    isShowStyleOnboarding,
    isShowSendOnboarding,
    isFinishedSendOnboarding,
    isFinishedPromptOnboarding,
    isFinishedStyleOnboarding,
    updatePromptOnboarding,
    updateStyleOnboarding,
    updateSendOnboarding,
    showPromptOnboarding,
    showStyleOnboarding,
    showSendOnboarding,
    hideAllOnboardings,
    finishPromptOnboarding,
    finishStyleOnboarding,
    finishSendOnboarding,
    finishAllOnboardings,
  }
}
