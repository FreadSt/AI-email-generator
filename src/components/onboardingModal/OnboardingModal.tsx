import React, { FC } from 'react'
import Modal from '../modal/Modal'
import icon from '../../assets/images/Logo.svg'
import { AnimatePresence } from 'framer-motion'
import './style.scss'
import { useOutsideClick } from '../../lib/hooks/useOutsideClick'
import { RootState, useAppDispatch } from '../../store'
import { useSelector } from 'react-redux'
import { setOnboardingModal, setOnboardingStepsModal } from '../../store/slice/modalSlice'
import { Button } from '../button/Button'
import { setHideOnboarding } from '../../lib/services/asyncStorage'

export const OnboardingModal: FC = () => {
  const dispatch = useAppDispatch()
  const isOnboardingModal = useSelector((state: RootState) => state.modal.isOnboardingModal)

  const toggle = () => {
    dispatch(setOnboardingModal(false))
  }

  const ref = useOutsideClick(toggle)

  const onSkip = () => {
    toggle()
    setHideOnboarding(true)
  }

  const onClick = () => {
    toggle()
    dispatch(setOnboardingStepsModal(true))
  }

  return (
    <AnimatePresence>
      {isOnboardingModal && (
        <Modal
          modalClassName='onboarding-modal-container'
          modalContentClassName='onboarding-modal-content'
        >
          <div className='onboarding-modal' ref={ref}>
            <img src={icon} alt='' className='onboarding-modal-icon' />
            <p className='onboarding-modal-title'>Welcome to MagicMail!</p>
            <p className='onboarding-modal-text'>
              We’re happy to have you here! Let’s start by showing you around the user
              interface—then it’s time to start conjuring your own emails!
            </p>
            <Button text='let’s go!' className='onboarding-modal-button' onClick={onClick} />
            <button className='onboarding-modal-button-skip' onClick={onSkip}>
              skip onboarding
            </button>
          </div>
        </Modal>
      )}
    </AnimatePresence>
  )
}
