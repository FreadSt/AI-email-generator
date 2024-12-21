import React, { FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './style.scss'
import logo from '../../assets/images/mobile-nav-logo.svg'
import { AppRoutes } from '../../lib/constants'
import { MobileMenuButton } from '../mobileMenu/MobileMenuButton'
import { MainBanner } from '../mainBanner/MainBanner'
import { useDimensions } from '../../lib/hooks/useDimensions'

export const MobileNavbar: FC = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { isMobile } = useDimensions()

  const onClickLogo = () => {
    navigate(AppRoutes.home)
  }

  return pathname !== AppRoutes.create ? (
    <>
      <div className='mobile-navbar'>
        <img src={logo} alt='' className='logo' onClick={onClickLogo} />
        <MobileMenuButton />
      </div>
      {isMobile && <MainBanner />}
    </>
  ) : null
}
