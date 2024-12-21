import React, { FC } from 'react'
import Modal from '../modal/Modal'
import icon from '../../assets/images/warning.svg'
import { AnimatePresence } from 'framer-motion'
import './style.scss'
import { useOutsideClick } from '../../lib/hooks/useOutsideClick'
import { RootState, useAppDispatch } from '../../store'
import { useSelector } from 'react-redux'
import { setAppliedCouponModal } from '../../store/slice/modalSlice'
import { Button } from '../button/Button'
import { fetchPrices } from '../../store/slice/pricingSlice'
import { NotificationTypes } from '../../lib/constants'
import { useNotification } from '../../lib/hooks/useNotification'

interface AppliedCouponModalProps {
  coupon: string
  updateAppliedCoupon: (value: string) => void
}

export const AppliedCouponModal: FC<AppliedCouponModalProps> = ({coupon, updateAppliedCoupon}) => {
  const dispatch = useAppDispatch()
  const isAppliedCouponModal = useSelector((state: RootState) => state.modal.isAppliedCouponModal)
  const { showNotification } = useNotification()

  const toggle = () => {
    dispatch(setAppliedCouponModal(false))
  }

  const ref = useOutsideClick(toggle)

  const onApplyCoupon = async () => {
    const data = await dispatch(fetchPrices(coupon))
    toggle()
    if (data?.payload === 'INVALID_COUPON') {
      showNotification(NotificationTypes.applyCodeWarning)
      return
    }
    updateAppliedCoupon(coupon)
    showNotification(NotificationTypes.applyCodeSuccess)
  }

  return (
    <AnimatePresence>
      {isAppliedCouponModal && (
        <Modal>
          <div className='applied-coupon-modal' ref={ref}>
            <img src={icon} alt='' className='applied-coupon-modal-icon' />
            <p className='applied-coupon-modal-title'>Discount code is already applied</p>
            <p className='applied-coupon-modal-text'>
              The discount tied to this code will replace the previous one. Discounts cannot be
              combined!
            </p>
            <div className='applied-coupon-modal-buttons'>
              <Button
                text='Apply anyway'
                className='applied-coupon-modal-button'
                onClick={onApplyCoupon}
              />
              <button onClick={toggle} className='applied-coupon-modal-button-skip'>
                nevermind
              </button>
            </div>
          </div>
        </Modal>
      )}
    </AnimatePresence>
  )
}
