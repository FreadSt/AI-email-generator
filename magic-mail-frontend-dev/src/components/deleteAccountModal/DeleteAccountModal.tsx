import { ChangeEventHandler, FC, useState } from 'react'
import Modal from '../modal/Modal'
import { AnimatePresence } from 'framer-motion'
import './style.scss'
import { useOutsideClick } from '../../lib/hooks/useOutsideClick'
import { RootState, useAppDispatch } from '../../store'
import { useSelector } from 'react-redux'
import { setDeleteAccountModal, setOopsModal } from '../../store/slice/modalSlice'
import { AppRoutes } from '../../lib/constants'
import { useNavigate } from 'react-router-dom'
import { clearAuthData } from '../../store/slice/authSlice'
import { clearFormData } from '../../store/slice/formDataSlice'
import { clearEmailContent } from '../../store/slice/testEmailSlice'
import { deleteUser } from '../../lib/api/auth'
import { removeAccessToken } from '../../lib/services/asyncStorage'

export const DeleteAccountModal: FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isDeleteAccountModal = useSelector((state: RootState) => state.modal.isDeleteAccountModal)
  const [deleteInput, setDeleteInput] = useState<string>('')

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    setDeleteInput(e.target.value)
  }

  const deleteAccount = async () => {
    if (deleteInput === 'delete') {
      try {
        const response = await deleteUser()
        console.log('Account deleted successfully:', response)
        if (response?.status === 200) {
          dispatch(setDeleteAccountModal(false))
          dispatch(clearFormData())
          dispatch(clearEmailContent())
          dispatch(clearAuthData())
          removeAccessToken()
          navigate(AppRoutes.home)
        }
      } catch (error) {
        console.error('Failed to delete account:', error)
        dispatch(setDeleteAccountModal(false))
        dispatch(setOopsModal(true))
      }
    } else {
      dispatch(setDeleteAccountModal(false))
      dispatch(setOopsModal(true))
    }
  }

  const toggle = () => {
    dispatch(setDeleteAccountModal(false))
  }

  const ref = useOutsideClick(toggle)

  return (
    <AnimatePresence>
      {isDeleteAccountModal && (
        <Modal>
          <div className='delete-modal' ref={ref}>
            <h3 className='delete-modal-title'>Are you sure you want to delete your account?</h3>
            <span className='delete-modal-subtitle'>
              All your generations, data and unused credits will be permanently gone.
            </span>
            <p className='delete-modal-text'>
              The process may take up to 48 hours during which you won’t be able to create new
              account using the same email.
            </p>
            <span className='delete-modal-subtitle'>
              To confirm account deletion please type “delete” in the box below.
            </span>
            <input
              name='delete'
              placeholder='Confirm your action'
              value={deleteInput}
              onChange={onChangeHandler}
            />
            <div className='delete-modal-buttons-box'>
              <button
                className='delete-modal-button'
                onClick={deleteAccount}
                disabled={deleteInput !== 'delete'}
              >
                delete
              </button>
              <button className='delete-modal-cancel' onClick={toggle}>
                nevermind
              </button>
            </div>
          </div>
        </Modal>
      )}
    </AnimatePresence>
  )
}
