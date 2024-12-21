import React, { ChangeEventHandler, FC, useEffect, useState } from 'react'
import './style.scss'
import { Link } from 'react-router-dom'
import chatIcon from '../../assets/images/chat.svg'
import creditsIcon from '../../assets/images/credits-icon.svg'
import { Button } from '../../components/button/Button'
import { useAuth } from '../../lib/hooks/useAuth'
import { RootState, useAppDispatch } from '../../store'
import { setAppliedCouponModal, setAuthModal, setSuccessModal } from '../../store/slice/modalSlice'
import { Price, stripeSession } from '../../lib/api/checkout'
import { NotificationTypes, PRICING_TABLE } from '../../lib/constants'
import { DinomailLogo, WimbleLogo } from '../../components/blocks/icon/Icon'
import userCircle from '../../assets/images/user-circle.svg'
import { useFeedback } from '../../lib/hooks/useFeedback'
import priceDollar from '../../assets/images/coin-dollar.svg'
import { useDimensions } from '../../lib/hooks/useDimensions'
import { fetchPrices } from '../../store/slice/pricingSlice'
import { useSelector } from 'react-redux'
import clsx from 'clsx'
import { useNotification } from '../../lib/hooks/useNotification'
import { AppliedCouponModal } from '../../components/appliedCouponModal/AppliedCouponModal'

interface PricingCardProps extends Price {
  onClick?: () => void
}

const PricingCard: FC<PricingCardProps> = ({
  price,
  name,
  credits,
  is_top,
  discount_price,
  save_price,
  onClick,
}) => {
  const { isMobile } = useDimensions()
  return (
    <div className={clsx('pricing-page-card', is_top && 'popular')}>
      {is_top && (
        <div className='card-label'>
          <span>Popular{!isMobile && ' option'}</span>
        </div>
      )}
      <div className='card-content'>
        <p className='card-title'>{name}</p>
        <div className='card-credits'>
          <img src={creditsIcon} alt='' />
          <span className='card-amount'>{credits} credits</span>
        </div>
        <div className='card-price-box'>
          <p className='card-price'>
            {!!discount_price && <span className='card-price-old'>${price}</span>} $
            {discount_price ? discount_price.toFixed(2) : price}
          </p>
          {!!save_price && <p className='card-discount'>Save {Math.round(save_price)}%</p>}
        </div>
      </div>
      <Button className='card-button' text='purchase' onClick={onClick} />
    </div>
  )
}

export const PricingPage: FC = () => {
  const { isMobile } = useDimensions()
  const dispatch = useAppDispatch()
  const { isSignedIn, user } = useAuth()
  const { prices } = useSelector((state: RootState) => state.pricing)
  const [wimbleHovered, setWimbleHovered] = useState(false)
  const [dinoHovered, setDinoHovered] = useState(false)
  const [message, setMessage] = useState('')
  const [coupon, setCoupon] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState('')
  const { handleSubmit } = useFeedback(message)
  const { showNotification } = useNotification()

  const onSubmit = () => {
    handleSubmit(() => {
      setMessage('')
      dispatch(setSuccessModal(true))
    })
  }

  const onCouponChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setCoupon(e.target.value)
  }

  const updateAppliedCoupon = (value: string) => {
    setAppliedCoupon(value)
  }

  const onApplyCoupon = async () => {
    if (appliedCoupon) {
      dispatch(setAppliedCouponModal(true))
      return
    }
    const data = await dispatch(fetchPrices(coupon))
    if (data?.payload === 'INVALID_COUPON') {
      showNotification(NotificationTypes.applyCodeWarning)
      return
    }
    updateAppliedCoupon(coupon)
    showNotification(NotificationTypes.applyCodeSuccess)
  }

  const onMessageChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setMessage(e.target.value)
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

  const onPurchase = (priceId: string) => async () => {
    if (!isSignedIn) {
      dispatch(setAuthModal(true))
      return
    }
    const code = appliedCoupon ? appliedCoupon : undefined
    const response = await stripeSession(priceId, code)
    if (response?.status === 200 && response.data.url) {
      window.open(response.data.url, '_self')
    }
  }

  useEffect(() => {
    dispatch(fetchPrices())
  }, [])

  return (
    <div className='pricing-page'>
      <div className='pricing-page-content-box'>
        <div className='pricing-page-content-header'>
          <h1 className='pricing-page-title'>Magic priced fairly</h1>
          <p className='pricing-page-text'>We have no subscriptions, pay only for what you use</p>
        </div>
        <div className='pricing-page-cards-box'>
          {prices.map((price) => {
            return <PricingCard key={price.id} {...price} onClick={onPurchase(price.id)} />
          })}
          <div className='pricing-page-card'>
            <div className='card-content'>
              <p className='card-title'>Got a discount?</p>
              <p className='card-text'>
                Enter the code in the box below before purchasing any credit packs to receive
                discounted prices
              </p>
              <input
                type='text'
                className='card-input'
                placeholder='XXXXXXXX'
                value={coupon}
                onChange={onCouponChange}
              />
            </div>
            <Button
              className='card-button'
              text='apply discount'
              disabled={!coupon}
              onClick={onApplyCoupon}
            />
          </div>
        </div>
        <div className='pricing-page-content-footer'>
          <div className='pricing-page-info'>
            <section className='pricing-table-title'>
              <img src={priceDollar} alt='' />
              <p className='pricing-title-text'>Pricing table</p>
            </section>
            <div className='pricing-table-body'>
              {PRICING_TABLE.map((item, index) => (
                <aside key={index}>
                  <div className='line' />
                  <article className='pricing-table-row'>
                    <div className='row-text'>
                      <p>{item.title}</p>
                      <span className='price-description'>{item.des}</span>
                    </div>
                    {item.per_recipient ? (
                      <div className='price-tag-container'>
                        <div className='price-tag'>
                          <img src={creditsIcon} alt='' />
                          <p>
                            {item.cost} {item.cost === 1 ? 'credit' : 'credits'} {isMobile ? ' per recipient' : ''}
                          </p>
                        </div>
                        {!isMobile && <span className="per-recipient">per recipient</span>}
                      </div>
                    ) : (
                      <div className='price-tag'>
                        <img src={creditsIcon} alt='' />
                        <p>
                          {item.cost} {item.cost === 1 ? 'credit' : 'credits'}
                        </p>
                      </div>
                    )}
                  </article>
                </aside>
              ))}
            </div>
          </div>
          {isSignedIn && (
            <div className='pricing-page-feedback'>
              <div className='pricing-page-feedback-header'>
                <p className='pricing-page-feedback-title'>
                  <img src={chatIcon} alt='' role='presentation' />
                  <span>Have something to say about the MagicMail?</span>
                </p>
                <p className='pricing-page-feedback-text'>
                  Spotted a bug, came up with a cool feature you&apos;d like to see implemented, or
                  just want to share your experience? We’re looking forward to hearing from you!
                </p>
              </div>
              <div className='pricing-page-feedback-form'>
                <textarea
                  className='pricing-page-feedback-form-input'
                  placeholder='Write something...'
                  name='message'
                  rows={4}
                  value={message}
                  onChange={onMessageChange}
                />
              </div>
              <div className='pricing-page-feedback-footer'>
                <div className='pricing-page-feedback-footer-user-info'>
                  {user?.picture ? (
                    <img
                      className='pricing-page-feedback-footer-user-photo'
                      src={user.picture}
                      alt=''
                      referrerPolicy='no-referrer'
                    />
                  ) : (
                    <img src={userCircle} alt='' />
                  )}
                  <div>
                    <p className='pricing-page-feedback-footer-user-name'>{user?.name}</p>
                    <p className='pricing-page-feedback-footer-user-email'>{user?.email}</p>
                  </div>
                </div>
                <div className='pricing-page-feedback-footer-button-box'>
                  <Button
                    className='pricing-page-feedback-footer-button'
                    text='submit'
                    onClick={onSubmit}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className='pricing-page-footer'>
        <p className='pricing-page-footer-text'>MagicMail © 2024 ∙ All rights reserved</p>
        <div className='pricing-page-footer-links'>
          {isMobile ? (
            <section className='mobile-links'>
              <Link to='/privacy' className='pricing-page-footer-text'>
                <span>Privacy Policy</span>
              </Link>
              <Link to='/terms' className='pricing-page-footer-text'>
                <span>Terms and Services</span>
              </Link>
            </section>
          ) : (
            <>
              <Link to='/privacy' className='pricing-page-footer-text'>
                <span>Privacy Policy</span>
              </Link>
              <Link to='/terms' className='pricing-page-footer-text'>
                <span>Terms and Services</span>
              </Link>
            </>
          )}
          <Link
            to='https://wimble.agency'
            target='_blank'
            className='pricing-page-footer-logo'
            onMouseEnter={onWimbleMouseEnter}
            onMouseLeave={onWimbleMouseLeave}
          >
            <span className='pricing-page-footer-text'>Conjured by</span>
            <WimbleLogo isHovered={wimbleHovered} />
          </Link>
          <Link
            to='https://dinomail.io/'
            target='_blank'
            className='pricing-page-footer-logo'
            onMouseEnter={onDinoMouseEnter}
            onMouseLeave={onDinoMouseLeave}
          >
            <span className='pricing-page-footer-text'>Enchanted by</span>
            <DinomailLogo isHovered={dinoHovered} />
          </Link>
        </div>
      </div>
      <AppliedCouponModal coupon={coupon} updateAppliedCoupon={updateAppliedCoupon} />
    </div>
  )
}
