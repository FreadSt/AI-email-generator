import React, { FC } from 'react'
import Modal from '../modal/Modal'
import icon from '../../assets/images/bolt-1.svg'
import { AnimatePresence } from 'framer-motion'
import './style.scss'
import { useOutsideClick } from '../../lib/hooks/useOutsideClick'
import { useNavigate } from 'react-router-dom'
import { AppRoutes } from '../../lib/constants'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../store'
import { setOutOfCreditsModal } from '../../store/slice/modalSlice'
import { Button } from '../button/Button'

export const OutOfCreditsModal: FC = () => {
  const dispatch = useAppDispatch()
  const isOutOfCreditsModal = useSelector((state: RootState) => state.modal.isOutOfCreditsModal)

  const toggle = () => {
    dispatch(setOutOfCreditsModal(false))
  }
  const ref = useOutsideClick(toggle)
  const navigate = useNavigate()

  const onclick = () => {
    navigate(AppRoutes.pricing)
    toggle()
  }

  return (
    <AnimatePresence>
      {isOutOfCreditsModal && (
        <Modal>
          <div className='out-of-credits-modal' ref={ref}>
            <img src={icon} alt='' className='out-of-credits-modal-icon' />
            <p className='out-of-credits-modal-title'>Oops... You’re out of credits.</p>
            <p className='out-of-credits-modal-text'>
              Please top up your balance to continue spreading magic
            </p>
            <Button className='out-of-credits-modal-button' onClick={onclick} text='top up' />
          </div>
        </Modal>
      )}
    </AnimatePresence>
  )
}
