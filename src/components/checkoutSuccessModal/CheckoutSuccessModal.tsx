import React, { FC } from 'react'
import Modal from '../modal/Modal'
import icon from '../../assets/images/check-circle-2.svg'
import { AnimatePresence } from 'framer-motion'
import './style.scss'
import { useOutsideClick } from '../../lib/hooks/useOutsideClick'
import { RootState, useAppDispatch } from '../../store'
import { useSelector } from 'react-redux'
import { setCheckoutSuccessModal } from '../../store/slice/modalSlice'
import { Button } from '../button/Button'

export const CheckoutSuccessModal: FC = () => {
  const dispatch = useAppDispatch()
  const isCheckoutSuccessModal = useSelector((state: RootState) => state.modal.isCheckoutSuccessModal)

  const toggle = () => {
    dispatch(setCheckoutSuccessModal(!isCheckoutSuccessModal))
  }

  const ref = useOutsideClick(toggle)

  return (
    <AnimatePresence>
      {isCheckoutSuccessModal && (
        <Modal>
          <div className='checkout-success-modal' ref={ref}>
            <img src={icon} alt='' className='checkout-success-modal-icon' />
            <p className='checkout-success-modal-title'>Payment done</p>
            <p className='checkout-success-modal-text'>Your credits should be accounted soon</p>
            <Button className='checkout-success-modal-button' onClick={toggle} text='cool!' />
          </div>
        </Modal>
      )}
    </AnimatePresence>
  )
}
