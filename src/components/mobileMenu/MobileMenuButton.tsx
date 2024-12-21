import { FC } from 'react'
import './style.scss'
import menuIcon from '../../assets/images/menu.svg'
import { useAppDispatch } from '../../store'
import { setShowMobileMenu } from '../../store/slice/mobileMenuSlice'

export const MobileMenuButton: FC = () => {
  const dispatch = useAppDispatch()

  const onClickMenu = () => {
    dispatch(setShowMobileMenu(true))
  }

  return (
    <div className='mobile-menu-button' onClick={onClickMenu}>
      <img src={menuIcon} alt='' />
    </div>
  )
}
