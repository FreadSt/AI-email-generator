import CookieConsent from 'react-cookie-consent'
import cookieIcon from '../../assets/images/cookie.svg'
import './style.scss'
import { Button } from '../button/Button'
import { useDimensions } from '../../lib/hooks/useDimensions'
import { Link } from 'react-router-dom'
import { AppRoutes } from '../../lib/constants'

export const CookiesBanner = () => {
  const { isMobile } = useDimensions()
  return (
    <CookieConsent
      location='none'
      buttonText='Okay 👌'
      cookieName='myAwesomeCookieName2'
      disableStyles={true}
      containerClasses='cookies-banner-container'
      contentClasses='cookies-banner-content'
      buttonClasses='cookies-banner-button'
      buttonWrapperClasses='cookies-banner-button-wrapper'
      ButtonComponent={Button}
      customButtonProps={{
        text: 'Okay 👌',
      }}
      expires={180}
    >
      <img src={cookieIcon} alt='' role='presentation' />
      <p>
        We use cookies to make your experience magical.
        {!isMobile && <br />}
        To learn more about our approach to data privacy,{' '}
        <Link to={AppRoutes.privacy} className='cookies-banner-link'>click here.</Link>
      </p>
    </CookieConsent>
  )
}
