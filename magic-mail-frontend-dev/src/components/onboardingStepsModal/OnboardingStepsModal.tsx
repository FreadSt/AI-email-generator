import React, { FC, useState } from 'react'
import Modal from '../modal/Modal'
import backIcon from '../../assets/images/arrow-left.svg'
import stepOneImage from '../../assets/images/step-1-image.png'
import stepTwoImage from '../../assets/images/step-2-image.png'
import stepThreeImage from '../../assets/images/step-3-image.png'
import { AnimatePresence } from 'framer-motion'
import './style.scss'
import { useOutsideClick } from '../../lib/hooks/useOutsideClick'
import { RootState, useAppDispatch } from '../../store'
import { useSelector } from 'react-redux'
import { setOnboardingStepsModal } from '../../store/slice/modalSlice'
import { Button } from '../button/Button'
import { ArrowForward } from '../blocks/icon/Icon'
import { setHideOnboarding } from '../../lib/services/asyncStorage'

const stepImages = [stepOneImage, stepTwoImage, stepThreeImage]
const stepTitles = ['Start With the Prompt', 'Explore the Arcane Tabs', 'Generate and Send']

export const OnboardingStepsModal: FC = () => {
  const [step, setStep] = useState(0)
  const dispatch = useAppDispatch()
  const isOnboardingStepsModal = useSelector(
    (state: RootState) => state.modal.isOnboardingStepsModal,
  )

  const isStepOne = step === 0
  const isStepTwo = step === 1
  const isStepThree = step === 2

  const toggle = () => {
    dispatch(setOnboardingStepsModal(false))
  }

  const ref = useOutsideClick(toggle)

  const goBack = () => {
    setStep(step - 1)
  }

  const goForward = () => {
    if (isStepThree) {
      setHideOnboarding(true)
      toggle()
    } else {
      setStep(step + 1)
    }
  }

  return (
    <AnimatePresence>
      {isOnboardingStepsModal && (
        <Modal
          modalClassName='onboarding-steps-modal-container'
          modalContentClassName='onboarding-steps-modal-content'
        >
          <div className='onboarding-steps-modal' ref={ref}>
            <p className='onboarding-steps-modal-label'>Step {step + 1}</p>
            <p className='onboarding-steps-modal-title'>{stepTitles[step]}</p>
            <div className='onboarding-steps-modal-image-box'>
              <img src={stepImages[step]} alt='' className='onboarding-steps-modal-image' />
            </div>
            <p className='onboarding-steps-modal-text'>
              {isStepOne && (
                <>
                  Fill in the ‘Email Content (message)’ box on the left—it’s the core of your spell!
                  Fields marked with <span className='required'>*</span> are required (there are
                  just two).
                </>
              )}
              {isStepTwo && (
                <>
                  Use the Style tab to tweak your email’s look and feel, and the Settings tab for
                  extra options. Discover the magic!
                </>
              )}
              {isStepThree && (
                <>
                  Click ‘Generate an email’ to let MagicMail do the work. Once generated, sending
                  options will appear below your email preview.
                </>
              )}
            </p>
            <div className='onboarding-steps-modal-buttons-box'>
              <button
                className='onboarding-steps-modal-button-skip'
                disabled={isStepOne}
                onClick={goBack}
              >
                <img src={backIcon} alt='' />
              </button>
              <Button
                text={isStepThree ? 'let’s roll' : 'Next'}
                RightSvgIcon={ArrowForward}
                className='onboarding-steps-modal-button'
                onClick={goForward}
              />
            </div>
          </div>
        </Modal>
      )}
    </AnimatePresence>
  )
}
