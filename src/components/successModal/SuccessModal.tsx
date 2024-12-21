import React, { FC } from 'react'
import Modal from '../modal/Modal'
import icon from '../../assets/images/check-circle-2.svg'
import { AnimatePresence } from 'framer-motion'
import './style.scss'
import { useOutsideClick } from '../../lib/hooks/useOutsideClick'
import { RootState, useAppDispatch } from '../../store'
import { useSelector } from 'react-redux'
import { setSuccessModal } from '../../store/slice/modalSlice'
import { Button } from '../button/Button'

export const SuccessModal: FC = () => {
  const dispatch = useAppDispatch()
  const isSuccessModal = useSelector((state: RootState) => state.modal.isSuccessModal)

  const toggle = () => {
    dispatch(setSuccessModal(false))
  }

  const ref = useOutsideClick(toggle)

  return (
    <AnimatePresence>
      {isSuccessModal && (
        <Modal>
          <div className='success-modal' ref={ref}>
            <img src={icon} alt='' className='success-modal-icon' />
            <p className='success-modal-title'>Yay! Your email is on it’s way!</p>
            <p className='success-modal-text'>It probably even already reached the destination</p>
            <Button className='success-modal-button' onClick={toggle} text='cool!' />
          </div>
        </Modal>
      )}
    </AnimatePresence>
  )
}
