import React, { FC } from 'react'
import Modal from '../modal/Modal'
import icon from '../../assets/images/warning.svg'
import { AnimatePresence } from 'framer-motion'
import './style.scss'
import { useOutsideClick } from '../../lib/hooks/useOutsideClick'
import { RootState, useAppDispatch } from '../../store'
import { useSelector } from 'react-redux'
import { setOopsModal } from '../../store/slice/modalSlice'
import { Button } from '../button/Button'

export const OopsModal: FC = () => {
  const dispatch = useAppDispatch()
  const isOopsModal = useSelector((state: RootState) => state.modal.isOopsModal)

  const toggle = () => {
    dispatch(setOopsModal(false))
  }

  const ref = useOutsideClick(toggle)

  const onClick = () => {
    document.location.reload()
  }

  return (
    <AnimatePresence>
      {isOopsModal && (
        <Modal>
          <div className='oops-modal' ref={ref}>
            <img src={icon} alt='' className='oops-modal-icon' />
            <p className='oops-modal-title'>Oops... Something went wrong.</p>
            <p className='oops-modal-text'>
              Click the button below to reload the page and try again.
            </p>
            <Button text='reload' className='oops-modal-button' onClick={onClick} />
          </div>
        </Modal>
      )}
    </AnimatePresence>
  )
}
