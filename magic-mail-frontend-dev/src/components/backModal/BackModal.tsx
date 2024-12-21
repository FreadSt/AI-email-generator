import React, { FC } from 'react'
import Modal from '../modal/Modal'
import icon from '../../assets/images/warning.svg'
import { AnimatePresence } from 'framer-motion'
import './style.scss'
import { useOutsideClick } from '../../lib/hooks/useOutsideClick'
import { RootState, useAppDispatch } from '../../store'
import { useSelector } from 'react-redux'
import { setBackModal } from '../../store/slice/modalSlice'
import { Button } from '../button/Button'
import { setPage } from '../../store/slice/paginationSlice'

export const BackModal: FC = () => {
  const dispatch = useAppDispatch()
  const isBackModal = useSelector((state: RootState) => state.modal.isBackModal)

  const toggle = () => {
    dispatch(setBackModal(false))
  }

  const ref = useOutsideClick(toggle)

  const onSubmit = () => {
    toggle()
    dispatch(setPage(0))
  }

  return (
    <AnimatePresence>
      {isBackModal && (
        <Modal modalClassName='back-modal-container' modalContentClassName='back-modal-content'>
          <div className='back-modal' ref={ref}>
            <div className='back-modal-header'>
              <img src={icon} alt='' className='back-modal-icon' />
              <p className='back-modal-title'>Are you sure you want to go back without sending?</p>
              <p className='back-modal-text'>
                Generated Email will be removed, but you’ll still find it in the gallery section.
              </p>
            </div>
            <div className='back-modal-buttons'>
              <button onClick={onSubmit} className='back-modal-button-skip'>
                yes, go back
              </button>
              <Button className='back-modal-button' onClick={toggle} text='stay here' />
            </div>
          </div>
        </Modal>
      )}
    </AnimatePresence>
  )
}
