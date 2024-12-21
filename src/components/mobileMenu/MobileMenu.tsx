import { FC, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './style.scss'
import userCircle from '../../assets/images/user-circle.svg'
import userCircleMobile from '../../assets/images/user-circle-mobile.svg'
import magicmail from '../../assets/images/magicmail.svg'
import menuIcon from '../../assets/images/more-vertical.svg'
import creditsIcon from '../../assets/images/credits-icon.svg'
import logoutIcon from '../../assets/images/log-out.svg'
import removeIcon from '../../assets/images/user-remove.svg'
import { AppRoutes, desktopTabs, mobileTabs } from '../../lib/constants'
import clsx from 'clsx'
import { useAuth } from '../../lib/hooks/useAuth'
import { RootState, useAppDispatch } from '../../store'
import { setAuthModal, setDeleteAccountModal } from '../../store/slice/modalSlice'
import { Sheet } from 'react-modal-sheet'
import { useSelector } from 'react-redux'
import { setShowMobileMenu } from '../../store/slice/mobileMenuSlice'
import { useDimensions } from '../../lib/hooks/useDimensions'
import pricingIcon from '../../assets/images/pricing-icon.svg'

export const MobileMenu: FC = () => {
  const dispatch = useAppDispatch()
  const { isMobile } = useDimensions()
  const { isSignedIn, user, onSignOut } = useAuth()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const isShowMobileMenu = useSelector((state: RootState) => state.mobileMenu.isShowMobileMenu)

  const tabs = useMemo(() => (isMobile ? mobileTabs : desktopTabs), [isMobile])

  const menuToggle = () => {
    dispatch(setShowMobileMenu(!isShowMobileMenu))
  }

  const onClick = (route: AppRoutes) => () => {
    menuToggle()
    navigate(route)
  }

  const onSignOutClick = () => {
    menuToggle()
    onSignOut()
    navigate(AppRoutes.home)
  }

  const onDeleteAccountClick = () => {
    menuToggle()
    dispatch(setDeleteAccountModal(true))
  }

  const onSignInClick = () => {
    menuToggle()
    dispatch(setAuthModal(true))
  }

  return (
    <Sheet isOpen={isShowMobileMenu} onClose={menuToggle} detent='content-height'>
      <Sheet.Container>
        <Sheet.Content>
          <div className='mobile-menu'>
            <div className='mobile-menu-header'>
              <div className='mobile-menu-header-line'></div>
            </div>
            {tabs.map(({ name, icon, link }, index) => {
              const isPricing = link === AppRoutes.pricing
              const nameText = isPricing && !isSignedIn ? 'Pricing' : name
              const iconSrc = isPricing && !isSignedIn ? pricingIcon : icon
              return (
                <div
                  key={index}
                  className={clsx('mobile-menu-item', pathname === link && 'active')}
                >
                  <div className='mobile-menu-item-inner' onClick={onClick(link)}>
                    <span>{nameText}</span>
                    <img className='mobile-menu-item-icon' src={iconSrc} alt='' />
                  </div>
                </div>
              )
            })}
            {user && (
              <div className='mobile-menu-item'>
                <div className='mobile-menu-item-user'>
                  {user?.picture ? (
                    <img
                      src={user.picture}
                      alt=''
                      referrerPolicy='no-referrer'
                      className='mobile-menu-item-avatar logged'
                    />
                  ) : (
                    <img src={userCircle} alt='' className='mobile-menu-item-avatar' />
                  )}
                  <div>
                    {user.name && <p className='user-name'>{user.name}</p>}
                    {user.email && <p className='user-email'>{user.email}</p>}
                  </div>
                </div>
                <div className='mobile-menu-item-user-credits'>
                  <img src={creditsIcon} alt='' />
                  <span>{user.credits || 0}</span>
                </div>
              </div>
            )}
            {isSignedIn ? (
              <>
                <div className='mobile-menu-item'>
                  <div className='mobile-menu-item-inner logout' onClick={onSignOutClick}>
                    <span>Log out</span>
                    <img className='mobile-menu-item-icon' src={logoutIcon} alt='' />
                  </div>
                </div>
                <div className='mobile-menu-item' onClick={onDeleteAccountClick}>
                  <div className='mobile-menu-item-inner remove'>
                    <span>Delete account</span>
                    <img className='mobile-menu-item-icon' src={removeIcon} alt='' />
                  </div>
                </div>
              </>
            ) : (
              <div className='mobile-menu-item'>
                <div className='mobile-menu-item-inner' onClick={onSignInClick}>
                  <span>Sign In</span>
                  <img className='mobile-menu-item-icon' src={userCircleMobile} alt='' />
                </div>
              </div>
            )}
          </div>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop
        style={{ backdropFilter: 'blur(10px)', height: 'calc(100% - 80px)' }}
        onTap={menuToggle}
      />
    </Sheet>
  )
}
