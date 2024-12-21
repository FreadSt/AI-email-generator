import React, { useEffect } from 'react'
import { Sidebar } from '../../components/sidebar/Sidebar'
import { Placeholder } from '../../components/placeholder/Placeholder'
import './style.scss'
import { Popup } from '../../components/popup/Popup'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../store'
import { Loader } from '../../components/loader/Loader'
import EmailComponent from '../../components/HTMLparser/HTMLcomponent'
import { Toolbar } from '../../components/toolbar/Toolbar'
import { FormComponent } from '../../components/sidebar/form/Form'
import creditsIcon from '../../assets/images/credits-icon.svg'
import arrowIcon from '../../assets/images/arrow-back.svg'
import { useAuth } from '../../lib/hooks/useAuth'
import { BackModal } from '../../components/backModal/BackModal'
import { setAuthModal, setBackModal } from '../../store/slice/modalSlice'
import { useOnboarding } from '../../lib/hooks/useOnboarding'
import { MobileMenuButton } from '../../components/mobileMenu/MobileMenuButton'
import { useDimensions } from '../../lib/hooks/useDimensions'

export const CreatePage: React.FC = () => {
  const dispatch = useAppDispatch()
  const { emailContent, loading } = useSelector((state: RootState) => state.testEmail)
  const error = useSelector((state: RootState) => state.testEmail.error)
  const page = useSelector((state: RootState) => state.pagination.page)
  const { isBackModal, isAuthModal } = useSelector((state: RootState) => state.modal)
  const { user, isSignedIn } = useAuth()
  const { isFinishedPromptOnboarding, showPromptOnboarding } = useOnboarding()
  const { viewportHeight } = useDimensions()

  const goBack = () => {
    dispatch(setBackModal(true))
  }

  const renderContent = () => {
    if (loading) {
      return <Loader showProgress={true} />
    }
    if (error) {
      return <Placeholder />
    }
    if (emailContent && emailContent.html) {
      return (
        <>
          <Toolbar />
          <EmailComponent html={emailContent.html} />
          <div className='popup-layout-box'>
            <Popup />
          </div>
        </>
      )
    }
    return <Placeholder />
  }

  useEffect(() => {
    dispatch(setAuthModal(!isSignedIn))
  }, [isSignedIn])

  useEffect(() => {
    if (!isFinishedPromptOnboarding) {
      showPromptOnboarding()
    }
  }, [isFinishedPromptOnboarding])

  return (
    <>
      <div className='create-page'>
        <Sidebar />
        <div className={loading ? 'load-content' : 'content-wrapper'}>{renderContent()}</div>
      </div>
      <div className='create-page-mobile'>
        <div className='create-page-mobile-header'>
          <div className='create-page-mobile-header-title-box'>
            {page === 1 && <img src={arrowIcon} alt='' onClick={goBack} />}
            <h1 className='create-page-mobile-header-title'>MagicMail wizard</h1>
            <span className='create-page-mobile-header-pagination'>{page + 1}/2</span>
          </div>
          <MobileMenuButton />
        </div>
        {page === 0 && <FormComponent />}
        {page === 1 && (
          <div className={loading ? 'load-content' : 'content-wrapper'}>{renderContent()}</div>
        )}
      </div>
      {isBackModal && <BackModal />}
    </>
  )
}
