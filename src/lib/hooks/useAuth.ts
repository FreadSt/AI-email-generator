import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../store'
import { checkSignIn, fetchUser, signIn, signOut } from '../../store/slice/authSlice'
import { appleSignIn, googleSignIn } from '../api/auth'
import { clearFormData } from '../../store/slice/formDataSlice'
import { clearEmailContent } from '../../store/slice/testEmailSlice'
import { getIsGranted, removeIsGranted, setIsGranted } from '../services/asyncStorage'
import { setPermissionGrantedModal } from '../../store/slice/modalSlice'

export const useAuth = () => {
  const { isSignedIn, user } = useSelector((state: RootState) => state.auth)
  const dispatch = useAppDispatch()

  const onGoogleSignIn = async (useHint?: boolean) => {
    const userEmail = useHint ? user?.email : undefined
    const response = await googleSignIn(userEmail)
    if (response?.status === 200 && response.data.url) {
      if (useHint) {
        setIsGranted(true)
      }
      window.open(response.data.url, '_self')
    }
  }

  const onGoogleCallback = async (code: string) => {
    await dispatch(signIn({ type: 'google', code }))
    await dispatch(fetchUser())
    const isGranted = getIsGranted()
    if (isGranted) {
      dispatch(setPermissionGrantedModal(true))
      removeIsGranted()
    }
  }

  const onAppleCallback = async (code: string, token: string) => {
    dispatch(signIn({ type: 'apple', code, token }))
  }

  const onAppleSignIn = async () => {
    const response = await appleSignIn()
    if (response?.status === 200 && response.data.url) {
      window.open(response.data.url, '_self')
    }
  }

  const onGetUser = () => {
    dispatch(fetchUser())
  }

  const onSignOut = () => {
    dispatch(signOut())
    dispatch(clearFormData())
    dispatch(clearEmailContent())
  }
  const onCheckSignIn = () => {
    dispatch(checkSignIn())
  }

  return {
    isSignedIn,
    user,
    onGoogleSignIn,
    onGoogleCallback,
    onAppleSignIn,
    onAppleCallback,
    onGetUser,
    onSignOut,
    onCheckSignIn,
  }
}
