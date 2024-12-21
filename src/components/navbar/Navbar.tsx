import { FC, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './style.scss'
import logo from '../../assets/images/Logo.svg'
import userCircle from '../../assets/images/user-circle.svg'
import userCircleMobile from '../../assets/images/user-circle-mobile.svg'
import magicmail from '../../assets/images/magicmail.svg'
import menuIcon from '../../assets/images/more-vertical.svg'
import creditsIcon from '../../assets/images/credits-icon.svg'
import logoutIcon from '../../assets/images/log-out.svg'
import removeIcon from '../../assets/images/user-remove.svg'
import pricingIcon from '../../assets/images/pricing-icon.svg'
import { AppRoutes, desktopTabs, mobileTabs } from '../../lib/constants'
import clsx from 'clsx'
import { useAuth } from '../../lib/hooks/useAuth'
import { RootState, useAppDispatch } from '../../store'
import {
  setAuthModal,
  setDeleteAccountModal,
  // setOnboardingModal,
} from '../../store/slice/modalSlice'
import { getHideOnboarding } from '../../lib/services/asyncStorage'
import { useDimensions } from '../../lib/hooks/useDimensions'
import { Sheet } from 'react-modal-sheet'
// import { useSelector } from 'react-redux'

export const Navbar: FC = () => {
  const { isMobile, height } = useDimensions()
  const dispatch = useAppDispatch()
  const {
    isSignedIn,
    user,
    onGoogleCallback,
    onAppleCallback,
    onSignOut,
    onGetUser,
    onCheckSignIn,
  } = useAuth()
  const navigate = useNavigate()
  const { pathname, search } = useLocation()
  // const isAuthModal = useSelector((state: RootState) => state.modal.isAuthModal)

  const [showDropdown, setShowDropdown] = useState(false)

  const tabs = useMemo(() => (isMobile ? mobileTabs : desktopTabs), [isMobile])

  const dropdownToggle = () => {
    setShowDropdown(!showDropdown)
  }

  const onClick = (route: AppRoutes) => () => navigate(route)

  const onSignOutClick = () => {
    dropdownToggle()
    onSignOut()
    navigate(AppRoutes.home)
  }

  const onCallback = async () => {
    if (pathname === AppRoutes.googleCallback) {
      const paramsString = search.replace('?', '')
      const searchParams = new URLSearchParams(paramsString)
      const code = searchParams.get('code')
      if (code) {
        await onGoogleCallback(code)
        navigate(AppRoutes.create)
      }
    }
    if (pathname === AppRoutes.appleCallback) {
      const paramsString = search.replace('?', '')
      const searchParams = new URLSearchParams(paramsString)
      const code = searchParams.get('code')
      const token = searchParams.get('id_token')
      if (code && token) {
        await onAppleCallback(code, token)
        navigate(AppRoutes.create)
      }
    }
  }

  const onDeleteAccountClick = () => {
    dropdownToggle()
    dispatch(setDeleteAccountModal(true))
  }

  const onAvatarClick = () => {
    isSignedIn ? dropdownToggle() : dispatch(setAuthModal(true))
  }

  useEffect(() => {
    if (pathname !== AppRoutes.googleCallback && pathname !== AppRoutes.appleCallback) {
      onCheckSignIn()
    }
    onCallback().catch()
    if (isSignedIn) {
      onGetUser()
    }
  }, [])

  // useEffect(() => {
  //   const hideOnboarding = getHideOnboarding()
  //   let timeoutId: NodeJS.Timeout;
  //   if (pathname === AppRoutes.create && !isAuthModal && !hideOnboarding) {
  //     timeoutId = setTimeout(() => {
  //       dispatch(setOnboardingModal(true))
  //     }, 1000)
  //   }
  //   return () => clearTimeout(timeoutId)
  // }, [pathname])

  return (
    <div className='navbar'>
      <div className='nav-box'>
        <div className='logo-box'>
          <img src={logo} alt='' className='logo' onClick={onClick(AppRoutes.home)} />
        </div>
        <nav className='tabs-box'>
          {tabs.map(({ name, icon, link }, index) => {
            const isPricing = link === AppRoutes.pricing
            const nameText = isPricing && !isSignedIn ? 'Pricing' : name
            const iconSrc = isPricing && !isSignedIn ? pricingIcon : icon
            return (
              <button
                key={index}
                className={clsx(
                  'tab',
                  !isMobile && isPricing && isSignedIn && 'pricing',
                  pathname === link && 'active',
                )}
                onClick={onClick(link)}
              >
                <img src={iconSrc} alt='' className='tab-image' />
                <span className='tab-name'>{nameText}</span>
              </button>
            )
          })}
          {isMobile && (
            <button
              className={clsx('tab profile', showDropdown && 'active')}
              onClick={onAvatarClick}
            >
              {user?.picture ? (
                <img
                  src={user.picture}
                  alt=''
                  className='avatar logged'
                  referrerPolicy='no-referrer'
                />
              ) : (
                <img src={isMobile ? userCircleMobile : userCircle} alt='' className='avatar' />
              )}
              <span className='tab-title'>Profile</span>
            </button>
          )}
        </nav>
      </div>
      {height > 850 && (
        <div className='title-box'>
          <img src={magicmail} alt='' className='title' />
        </div>
      )}
      <div className='menu-box'>
        {isSignedIn && user && (
          <div className='credits'>
            <img src={creditsIcon} alt='' />
            <span>{user.credits || 0}</span>
          </div>
        )}
        {user?.picture ? (
          <img
            src={user.picture}
            alt=''
            className='avatar logged'
            referrerPolicy='no-referrer'
            onClick={onAvatarClick}
          />
        ) : (
          <img src={userCircle} alt='' className='avatar' onClick={onAvatarClick} />
        )}
        {isSignedIn && (
          <button
            className={clsx('more-button', showDropdown && 'opened')}
            onClick={dropdownToggle}
          >
            <img src={menuIcon} alt='' />
          </button>
        )}
        {!isMobile && showDropdown && (
          <div className='more-dropdown'>
            {user && (
              <div className='dropdown-item'>
                {user.name && <p className='user-name'>{user.name}</p>}
                {user.email && <p className='user-email'>{user.email}</p>}
              </div>
            )}
            <div className='dropdown-item'>
              <div className='logout' onClick={onSignOutClick}>
                <img className='dropdown-item-icon' src={logoutIcon} alt='' />
                <span>Log out</span>
              </div>
            </div>
            <div className='dropdown-item' onClick={onDeleteAccountClick}>
              <div className='remove'>
                <img className='dropdown-item-icon' src={removeIcon} alt='' />
                <span>Delete account</span>
              </div>
            </div>
          </div>
        )}
        {isMobile && (
          <Sheet isOpen={showDropdown} onClose={dropdownToggle} detent='content-height'>
            <Sheet.Container>
              <Sheet.Content>
                <div className='more-dropdown'>
                  <div className='more-dropdown-header'>
                    <div className='more-dropdown-header-line'></div>
                  </div>
                  {user && (
                    <div className='dropdown-item'>
                      <div className='dropdown-item-user'>
                        {user?.picture ? (
                          <img
                            src={user.picture}
                            alt=''
                            referrerPolicy='no-referrer'
                            className='dropdown-item-avatar logged'
                          />
                        ) : (
                          <img src={userCircle} alt='' className='dropdown-item-avatar' />
                        )}
                        <div>
                          {user.name && <p className='user-name'>{user.name}</p>}
                          {user.email && <p className='user-email'>{user.email}</p>}
                        </div>
                      </div>
                      <div className='dropdown-item-user-credits'>
                        <img src={creditsIcon} alt='' />
                        <span>{user.credits || 0}</span>
                      </div>
                    </div>
                  )}
                  <div className='dropdown-item'>
                    <div className='logout' onClick={onSignOutClick}>
                      <span>Log out</span>
                      <img className='dropdown-item-icon' src={logoutIcon} alt='' />
                    </div>
                  </div>
                  <div className='dropdown-item' onClick={onDeleteAccountClick}>
                    <div className='remove'>
                      <span>Delete account</span>
                      <img className='dropdown-item-icon' src={removeIcon} alt='' />
                    </div>
                  </div>
                </div>
              </Sheet.Content>
            </Sheet.Container>
            <Sheet.Backdrop
              style={{ backdropFilter: 'blur(10px)', height: 'calc(100% - 80px)' }}
              onTap={dropdownToggle}
            />
          </Sheet>
        )}
      </div>
    </div>
  )
}
