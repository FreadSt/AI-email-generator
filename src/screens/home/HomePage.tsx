import React from 'react'
import './style.scss'
import { Link } from 'react-router-dom'
import googleIcon from '../../assets/images/google-logo.svg'
// import appleIcon from '../../assets/images/apple-logo.svg'
import { useAuth } from '../../lib/hooks/useAuth'
import { DinomailLogo, WimbleLogo } from '../../components/blocks/icon/Icon'
import { MainBanner } from '../../components/mainBanner/MainBanner'
import { useDimensions } from '../../lib/hooks/useDimensions'

export const HomePage: React.FC = () => {
  const { isMobile } = useDimensions()
  const { isSignedIn, onGoogleSignIn, onAppleSignIn } = useAuth()

  const [wimbleHovered, setWimbleHovered] = React.useState(false)
  const [dinoHovered, setDinoHovered] = React.useState(false)

  const onGoogleClick = async () => {
    await onGoogleSignIn()
  }

  const onWimbleMouseEnter = () => {
    setWimbleHovered(true)
  }

  const onWimbleMouseLeave = () => {
    setWimbleHovered(false)
  }

  const onDinoMouseEnter = () => {
    setDinoHovered(true)
  }

  const onDinoMouseLeave = () => {
    setDinoHovered(false)
  }

  return (
    <div className='home-page'>
      <div className='home-page-top'>
        {!isMobile && <MainBanner />}
        <h1 className='home-page-heading'>
          Sprinkle some <span className='gradient-text'>AI magic</span> <br />
          to your friends inboxes
        </h1>
        <p className='home-page-text'>
          Using magic of AI, generate engaging emails, heart-warming greetings and invitations,{' '}
          <br />
          all in the blink of an eye with MagicMail
        </p>
        {!isSignedIn && (
          <div className='home-page-buttons-box'>
            <button className='home-page-button' onClick={onGoogleClick}>
              <img src={googleIcon} alt='' />
              <span>continue with google</span>
            </button>
            {/*<button className='home-page-button' onClick={onAppleSignIn}>*/}
            {/*  <img src={appleIcon} alt='' />*/}
            {/*  <span>continue with Apple</span>*/}
            {/*</button>*/}
          </div>
        )}
      </div>
      <div className='home-page-bottom'>
        <div className='home-page-image'></div>
        <div className='home-page-footer'>
          <p className='home-page-footer-text'>MagicMail © 2024 ∙ All rights reserved</p>
          <div className='home-page-footer-links'>
            {isMobile ? (
              <section className='mobile-links'>
                <Link to='/privacy' className='home-page-footer-text'>
                  <span>Privacy Policy</span>
                </Link>
                <Link to='/terms' className='home-page-footer-text'>
                  <span>Terms and Services</span>
                </Link>
              </section>
            ) : (
              <>
                <Link to='/privacy' className='home-page-footer-text'>
                  <span>Privacy Policy</span>
                </Link>
                <Link to='/terms' className='home-page-footer-text'>
                  <span>Terms and Services</span>
                </Link>
              </>
            )}
            <div className='home-page-footer-logo-box'>
              <Link
                to='https://wimble.agency'
                target='_blank'
                className='home-page-footer-logo'
                onMouseEnter={onWimbleMouseEnter}
                onMouseLeave={onWimbleMouseLeave}
              >
                <span className='home-page-footer-text'>Conjured by</span>
                <WimbleLogo isHovered={wimbleHovered} />
              </Link>
              <Link
                to='https://dinomail.io/'
                target='_blank'
                className='home-page-footer-logo'
                onMouseEnter={onDinoMouseEnter}
                onMouseLeave={onDinoMouseLeave}
              >
                <span className='home-page-footer-text'>Enchanted by</span>
                <DinomailLogo isHovered={dinoHovered} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
