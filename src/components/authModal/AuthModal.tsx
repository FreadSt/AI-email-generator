import React, { FC } from 'react'
import Modal from '../modal/Modal'
import logo from '../../assets/images/auth-modal-logo.svg'
import { AnimatePresence } from 'framer-motion'
import googleIcon from '../../assets/images/google-logo.svg'
import appleIcon from '../../assets/images/apple-logo.svg'
import { useAuth } from '../../lib/hooks/useAuth'
import './style.scss'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../store'
import { useOutsideClick } from '../../lib/hooks/useOutsideClick'
import { setAuthModal } from '../../store/slice/modalSlice'

export const AuthModal: FC = () => {
  const dispatch = useAppDispatch()
  const { onGoogleSignIn, onAppleSignIn } = useAuth()
  const isAuthModal = useSelector((state: RootState) => state.modal.isAuthModal)

  const toggle = () => {
    dispatch(setAuthModal(false))
  }
  const ref = useOutsideClick(toggle)

  const onClick = async () => {
    await onGoogleSignIn()
  }

  return (
    <AnimatePresence>
      {isAuthModal && (
        <Modal>
          <div className='auth-modal' ref={ref}>
            <img src={logo} alt='' className='auth-modal-logo' />
            <button className='auth-modal-button' onClick={onClick}>
              <img src={googleIcon} alt='' />
              <span>continue with google</span>
            </button>
            {/*<button className='auth-modal-button' onClick={onAppleSignIn}>*/}
            {/*  <img src={appleIcon} alt='' />*/}
            {/*  <span>continue with Apple</span>*/}
            {/*</button>*/}
          </div>
        </Modal>
      )}
    </AnimatePresence>
  )
}
