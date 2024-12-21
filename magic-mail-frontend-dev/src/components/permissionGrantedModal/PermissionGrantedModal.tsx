import React, { FC } from 'react'
import Modal from '../modal/Modal'
import icon from '../../assets/images/check-circle-2.svg'
import { AnimatePresence } from 'framer-motion'
import './style.scss'
import { useOutsideClick } from '../../lib/hooks/useOutsideClick'
import { RootState, useAppDispatch } from '../../store'
import { useSelector } from 'react-redux'
import { setPermissionGrantedModal } from '../../store/slice/modalSlice'
import { Button } from '../button/Button'
import { useAuth } from '../../lib/hooks/useAuth'

export const PermissionGrantedModal: FC = () => {
  const dispatch = useAppDispatch()
  const { user } = useAuth()
  const isPermissionGrantedModal = useSelector((state: RootState) => state.modal.isPermissionGrantedModal)

  const toggle = () => {
    dispatch(setPermissionGrantedModal(!isPermissionGrantedModal))
  }

  const ref = useOutsideClick(toggle)

  return (
    <AnimatePresence>
      {isPermissionGrantedModal && user?.can_use_your_email && (
        <Modal>
          <div className='permission-granted-modal' ref={ref}>
            <img src={icon} alt='' className='permission-granted-modal-icon' />
            <p className='permission-granted-modal-title'>Permission granted</p>
            <p className='permission-granted-modal-text'>You can now send your email</p>
            <Button className='permission-granted-modal-button' onClick={toggle} text='cool!' />
          </div>
        </Modal>
      )}
    </AnimatePresence>
  )
}
