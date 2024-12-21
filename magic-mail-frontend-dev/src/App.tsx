import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppRoutes } from './lib/constants'
import './App.scss'
import { Navbar } from './components/navbar/Navbar'
import { HomePage } from './screens/home/HomePage'
import { CreatePage } from './screens/create/CreatePage'
import { GalleryPage } from './screens/gallery/GalleryPage'
import { ExplorePage } from './screens/explore/ExplorePage'
import { PricingPage } from './screens/pricing/PricingPage'
import { Terms } from './screens/terms/Terms'
import { Privacy } from './screens/privacy/Privacy'
import { AuthModal } from './components/authModal/AuthModal'
import { OutOfCreditsModal } from './components/outOfCreditsModal/OutOfCreditsModal'
import { OopsModal } from './components/oopsModal/OopsModal'
import { SuccessModal } from './components/successModal/SuccessModal'
import { DeleteAccountModal } from './components/deleteAccountModal/DeleteAccountModal'
import { CheckoutSuccessModal } from './components/checkoutSuccessModal/CheckoutSuccessModal'
import { CookiesBanner } from './components/cookiesBanner/CookiesBanner'
import { SuccessFeedbackModal } from './components/successFeedbackModal/SuccessFeedbackModal'
import { PermissionsModal } from './components/permissionsModal/PermissionsModal'
import { OnboardingModal } from './components/onboardingModal/OnboardingModal'
import { OnboardingStepsModal } from './components/onboardingStepsModal/OnboardingStepsModal'
import { Notification } from './components/notification/Notification'
import { MobileNavbar } from './components/mobileNavbar/MobileNavbar'
import { MobileMenu } from './components/mobileMenu/MobileMenu'
import { PermissionGrantedModal } from './components/permissionGrantedModal/PermissionGrantedModal'

function App() {
  return (
    <div className='main'>
      <BrowserRouter>
        <Navbar />
        <MobileNavbar />
        <Routes>
          <Route path={AppRoutes.home} element={<HomePage />} />
          <Route path={AppRoutes.googleCallback} element={<HomePage />} />
          <Route path={AppRoutes.appleCallback} element={<HomePage />} />
          <Route path={AppRoutes.create} element={<CreatePage />} />
          <Route path={AppRoutes.mails} element={<GalleryPage />} />
          <Route path={AppRoutes.explore} element={<ExplorePage />} />
          <Route path={AppRoutes.pricing} element={<PricingPage />} />
          <Route path={AppRoutes.terms} element={<Terms />} />
          <Route path={AppRoutes.privacy} element={<Privacy />} />
          <Route path='*' element={<Navigate to={AppRoutes.home} replace />} />
        </Routes>
        <MobileMenu />
        <AuthModal />
        <OutOfCreditsModal />
        <OopsModal />
        <SuccessModal />
        <SuccessFeedbackModal />
        <DeleteAccountModal />
        <CheckoutSuccessModal />
        <PermissionsModal />
        <CookiesBanner />
        <OnboardingModal />
        <OnboardingStepsModal />
        <Notification />
        <PermissionGrantedModal />
      </BrowserRouter>
    </div>
  )
}

export default App
