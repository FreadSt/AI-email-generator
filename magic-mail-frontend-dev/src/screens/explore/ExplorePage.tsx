import React, { useEffect } from 'react'
import './style.scss'
import userCircle from '../../assets/images/user-circle.svg'
import drawIcon from '../../assets/images/draw.svg'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../store'
import { fetchAllEmails } from '../../store/slice/gallerySlice'
import { useAuth } from '../../lib/hooks/useAuth'
import { Loader } from '../../components/loader/Loader'
import { Button } from '../../components/button/Button'
import { AppRoutes } from '../../lib/constants'
import { useNavigate } from 'react-router-dom'
import { BtnStars } from '../../components/blocks/icon/Icon'

export const ExplorePage: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { isSignedIn } = useAuth()
  const { loading, allEmails } = useSelector((state: RootState) => state.gallery)

  const onClick = () => {
    navigate(AppRoutes.create)
  }

  useEffect(() => {
    dispatch(fetchAllEmails())
  }, [isSignedIn])

  return (
    <div className='gallery-page'>
      <div className='gallery-page-content-box'>
        <div className='gallery-page-header'>
          <h1>Inspire and get inspired</h1>
        </div>
        {loading && (
          <div className='gallery-page-empty-content-box'>
            <Loader />
          </div>
        )}
        {!loading && allEmails.length === 0 && (
          <div className='gallery-page-empty-content-box'>
            <div className='gallery-page-empty-content'>
              <img src={drawIcon} alt='' role='presentation' />
              <h3 className='gallery-page-empty-content-title'>Nothing here yet...</h3>
              <p className='gallery-page-empty-content-text'>
                After generating your first email you’ll be able to find it (and send it again)
                here.
              </p>
              <Button
                className='gallery-page-empty-content-button'
                LeftSvgIcon={BtnStars}
                text='start creating'
                onClick={onClick}
              />
            </div>
          </div>
        )}
        {!loading && allEmails.length > 0 ? (
          <div className='mail-cards-box'>
            {allEmails.map((item) => (
              <div key={item.id} className='mail-card'>
                <div
                  className='mail-card-image'
                  style={{ backgroundImage: `url(${item.preview_url})` }}
                />
                <div className='mail-card-footer'>
                  <div className='mail-card-user'>
                    <img
                      src={item.user_info.picture || userCircle}
                      alt=''
                      className='mail-card-avatar'
                      referrerPolicy='no-referrer'
                    />
                    <span>{item.user_info.name}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}
