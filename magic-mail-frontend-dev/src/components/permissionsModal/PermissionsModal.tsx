import React, { FC } from 'react'
import Modal from '../modal/Modal'
import icon from '../../assets/images/warning.svg'
import { AnimatePresence } from 'framer-motion'
import './style.scss'
import { useOutsideClick } from '../../lib/hooks/useOutsideClick'
import { RootState, useAppDispatch } from '../../store'
import { useSelector } from 'react-redux'
import { setPermissionsModal } from '../../store/slice/modalSlice'
import { Button } from '../button/Button'
import { useAuth } from '../../lib/hooks/useAuth'

export const PermissionsModal: FC = () => {
  const dispatch = useAppDispatch()
  const { onGoogleSignIn, user } = useAuth()
  const isPermissionsModal = useSelector((state: RootState) => state.modal.isPermissionsModal)

  const toggle = () => {
    dispatch(setPermissionsModal(false))
  }

  const ref = useOutsideClick(toggle)

  const onClick = async () => {
    toggle()
    await onGoogleSignIn(true)
  }

  return (
    <AnimatePresence>
      {isPermissionsModal && !user?.can_use_your_email && (
        <Modal>
          <div className='permissions-modal' ref={ref}>
            <img src={icon} alt='' className='permissions-modal-icon' />
            <p className='permissions-modal-title'>Allow MagicMail to send emails on your behalf</p>
            <p className='permissions-modal-text'>
              It seems you missed an important checkbox during sign-up. Without this permission,
              we’re unable to send emails on your behalf. Please click the button below to grant the
              access.
            </p>
            <Button
              text='configure permissions'
              className='permissions-modal-button'
              onClick={onClick}
            />
          </div>
        </Modal>
      )}
    </AnimatePresence>
  )
}
