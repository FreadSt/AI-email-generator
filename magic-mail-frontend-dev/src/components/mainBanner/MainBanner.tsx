import React, { FC } from 'react'
import './style.scss'
import { useDimensions } from '../../lib/hooks/useDimensions'

export const MainBanner: FC = () => {
  const { isMobile } = useDimensions()
  return (
    <div className='main-banner'>
      <p className='main-banner-text'>
        We have launched on{' '}
        <a
          href='https://www.producthunt.com/products/magic-mail'
          target='_blank'
          className='main-banner-link'
          rel='noreferrer'
        >
          Product Hunt
        </a>
        ! {isMobile && <br />}Your support means the world to us ✨🚀
      </p>
    </div>
  )
}
