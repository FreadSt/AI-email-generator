import React, { ChangeEventHandler, FC, useState } from 'react'
import Modal from '../modal/Modal'
import icon from '../../assets/images/check-circle-2.svg'
import { AnimatePresence } from 'framer-motion'
import './style.scss'
import { useOutsideClick } from '../../lib/hooks/useOutsideClick'
import { RootState, useAppDispatch } from '../../store'
import { useSelector } from 'react-redux'
import { setSuccessFeedbackModal, setSuccessModal } from '../../store/slice/modalSlice'
import { Button } from '../button/Button'
import { useFeedback } from '../../lib/hooks/useFeedback'
import clsx from 'clsx'

export const SuccessFeedbackModal: FC = () => {
  const dispatch = useAppDispatch()
  const isSuccessFeedbackModal = useSelector(
    (state: RootState) => state.modal.isSuccessFeedbackModal,
  )
  const [message, setMessage] = useState('')
  const [rate, setRate] = useState('good')
  const { handleSubmit } = useFeedback(message, rate)

  const toggle = () => {
    dispatch(setSuccessFeedbackModal(false))
  }

  const ref = useOutsideClick(toggle)

  const onSubmit = () => {
    handleSubmit(() => {
      setMessage('')
      setRate('good')
      toggle()
      dispatch(setSuccessModal(true))
    })
  }

  const onRateChange = (value: string) => () => {
    setRate(value)
  }

  const onMessageChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setMessage(e.target.value)
  }

  return (
    <AnimatePresence>
      {isSuccessFeedbackModal && (
        <Modal
          modalClassName='success-feedback-modal-container'
          modalContentClassName='success-feedback-modal-content'
        >
          <div className='success-feedback-modal' ref={ref}>
            <div className='success-feedback-modal-header'>
              <img src={icon} alt='' className='success-feedback-modal-icon' />
              <p className='success-feedback-modal-title'>Yay! Your email is on it’s way!</p>
              <p className='success-feedback-modal-text'>
                Meanwhile, please help us improve MagicMail
              </p>
            </div>
            <div className='divider' />
            <div className='success-feedback-modal-questions-box'>
              <p className='success-feedback-modal-questions-title'>
                What is your overall experience
              </p>
              <p className='success-feedback-modal-questions-text'>Click the option to select it</p>
              <div className='success-feedback-modal-questions'>
                <div className={clsx('success-feedback-modal-question', rate === 'good' && 'active')} onClick={onRateChange('good')}>
                  <span className='success-feedback-modal-question-icon'>✨</span>
                  <span className='success-feedback-modal-question-text'>Works like magic!</span>
                </div>
                <div className={clsx('success-feedback-modal-question', rate === 'neutral' && 'active')} onClick={onRateChange('neutral')}>
                  <span className='success-feedback-modal-question-icon'>🤷‍♂️</span>
                  <span className='success-feedback-modal-question-text'>
                    It&apos;s not that bad...
                  </span>
                </div>
                <div className={clsx('success-feedback-modal-question', rate === 'bad' && 'active')} onClick={onRateChange('bad')}>
                  <span className='success-feedback-modal-question-icon'>😬</span>
                  <span className='success-feedback-modal-question-text'>What is it even for?</span>
                </div>
              </div>
            </div>
            <div className='divider' />
            <div className='success-feedback-modal-form-box'>
              <p className='success-feedback-modal-form-title'>Have something specific to say?</p>
              <p className='success-feedback-modal-form-text'>
                Your observations and/or suggestions mean the world to us and really help us make
                MagicMail better!
              </p>
              <div className='success-feedback-modal-form'>
                <textarea
                  className='success-feedback-modal-form-input'
                  placeholder='Write something...'
                  name='message'
                  rows={4}
                  value={message}
                  onChange={onMessageChange}
                />
              </div>
              <div className='success-feedback-modal-buttons'>
                <button onClick={toggle} className='success-feedback-modal-button-skip'>
                  skip
                </button>
                <Button
                  className='success-feedback-modal-button'
                  onClick={onSubmit}
                  text='send and close'
                />
              </div>
            </div>
          </div>
        </Modal>
      )}
    </AnimatePresence>
  )
}
