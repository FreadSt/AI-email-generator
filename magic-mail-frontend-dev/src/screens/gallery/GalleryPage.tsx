import React, { useEffect } from 'react'
import './style.scss'
import userCircle from '../../assets/images/user-circle.svg'
import drawIcon from '../../assets/images/draw.svg'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../store'
import { fetchMyEmails } from '../../store/slice/gallerySlice'
import { setRecipientsModal } from '../../store/slice/modalSlice'
import { RecipientsModal } from '../../components/recipientsModal/RecipientsModal'
import { useAuth } from '../../lib/hooks/useAuth'
import { Loader } from '../../components/loader/Loader'
import { Button } from '../../components/button/Button'
import { AppRoutes } from '../../lib/constants'
import { useNavigate } from 'react-router-dom'
import { BtnStars } from '../../components/blocks/icon/Icon'

export const GalleryPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { isSignedIn } = useAuth()
  const { loading, myEmails } = useSelector((state: RootState) => state.gallery)
  const [emailId, setEmailId] = React.useState<string>()

  const onSendAgain = (id: string) => () => {
    setEmailId(id)
    dispatch(setRecipientsModal(true))
  }

  const onClick = () => {
    navigate(AppRoutes.create)
  }

  useEffect(() => {
    if (isSignedIn) {
      dispatch(fetchMyEmails())
    }
  }, [isSignedIn])

  return (
    <div className='gallery-page'>
      <div className='gallery-page-content-box'>
        <div className='gallery-page-header'>
          <h1>My mails</h1>
        </div>
        {loading && (
          <div className='gallery-page-empty-content-box'>
            <Loader />
          </div>
        )}
        {!loading && myEmails.length === 0 && (
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
        {!loading && myEmails.length > 0 ? (
          <div className='mail-cards-box'>
            {myEmails.map((item) => (
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
                  {isSignedIn && (
                    <button className='mail-card-button' onClick={onSendAgain(item.id)}>
                      Send Again
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
      <RecipientsModal emailId={emailId} />
    </div>
  )
}
