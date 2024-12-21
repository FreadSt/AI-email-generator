import React, { FC, useState } from 'react'
import Modal from '../modal/Modal'
import { AnimatePresence } from 'framer-motion'
import './style.scss'
import { useOutsideClick } from '../../lib/hooks/useOutsideClick'
import { RootState, useAppDispatch } from '../../store'
import { useSelector } from 'react-redux'
import { setOopsModal, setRecipientsModal, setSuccessModal } from '../../store/slice/modalSlice'
import { ReactMultiEmail } from 'react-multi-email'
import { RemoveTag } from '../blocks/icon/Icon'
import { Button } from '../button/Button'
import { EmailDTO, sendEmail } from '../../store/slice/emailSlice'
import { fetchUser } from '../../store/slice/authSlice'
import creditsIcon from '../../assets/images/credits-icon.svg'
import { Sheet } from 'react-modal-sheet'
import { useDimensions } from '../../lib/hooks/useDimensions'

interface Props {
  emailId?: string
}

export const RecipientsModal: FC<Props> = ({ emailId }) => {
  const { isMobile, keyboardHeight } = useDimensions()
  const dispatch = useAppDispatch()
  const isRecipientsModal = useSelector((state: RootState) => state.modal.isRecipientsModal)
  const [recipientEmails, setRecipientEmails] = useState<string[]>([])

  const toggle = () => {
    dispatch(setRecipientsModal(false))
  }

  const ref = useOutsideClick(toggle)

  const handleSendEmail = async () => {
    if (!emailId || !recipientEmails.length) {
      return
    }
    const emailData: EmailDTO = {
      recipient_emails: recipientEmails,
      email_id: emailId,
      use_my_email: true,
    }
    try {
      toggle()
      await dispatch(sendEmail(emailData))
      await dispatch(fetchUser())
      dispatch(setSuccessModal(true))
      setRecipientEmails([])
    } catch (error) {
      console.error('Failed to send email:', error)
      dispatch(setOopsModal(true))
    }
  }

  const buttonRight = () => {
    return (
      <div className='button-right'>
        <img className='button-right-icon' src={creditsIcon} alt='' role='presentation' />
        <span className='button-right-text'>{recipientEmails.length}</span>
      </div>
    )
  }

  return (
    <AnimatePresence>
      {!isMobile && isRecipientsModal && (
        <Modal modalClassName='recipients-modal' modalContentClassName='recipients-modal-content'>
          <div className='recipients-modal-content-box' ref={ref}>
            <div className='recipients-text-box' ref={ref}>
              <h3 className='title-recipients'>Manage recipients</h3>
              <p className='entering-rules'>
                You can add up to 50 recipients, divided by ↵ Enter. Please notice that each sending
                will cost 1 credit extra.
              </p>
            </div>
            <div className='line' />
            <div className='email-box'>
              <span className='label'>Recipient’s email(s)</span>
              <ReactMultiEmail
                inputClassName='recipients-email-input'
                emails={recipientEmails}
                onChange={setRecipientEmails}
                getLabel={(email: string, index: number, removeEmail: (index: number) => void) => {
                  return (
                    <div className='data-tag' key={index}>
                      {email}
                      <div className='data-tag-handle' onClick={() => removeEmail(index)}>
                        <RemoveTag />
                      </div>
                    </div>
                  )
                }}
              />
            </div>
            <div className='line' />
            <span className='credit-calc'>
              {recipientEmails.length} recipient total — {recipientEmails.length} credit to send
            </span>
            <Button
              rightElement={buttonRight}
              className='recipients-modal-submit'
              text='Send'
              disabled={recipientEmails.length === 0}
              onClick={handleSendEmail}
            />
          </div>
        </Modal>
      )}
      {isMobile && isRecipientsModal && (
        <Sheet isOpen={isRecipientsModal} onClose={toggle} detent='content-height'>
          <Sheet.Container
            className='popup-recipients-modal'
            style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, bottom: keyboardHeight }}
          >
            <Sheet.Content
              className='popup-recipients-modal-content'
              style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
            >
              <div className='popup-recipients-modal-header'>
                <div className='popup-recipients-modal-header-line'></div>
              </div>
              <div className='popup-recipients-modal-content-box' ref={ref}>
                <div className='popup-recipients-text-box'>
                  <h3 className='title-recipients'>Manage recipients</h3>
                  <p className='entering-rules'>
                    You can add up to 50 recipients, divided by ↵ Enter. <br />
                    Please notice that each sending will cost 1 credit extra.
                  </p>
                </div>
                <div className='line' />
                <div className='email-box'>
                  <span className='label'>Recipient’s email(s)</span>
                  <ReactMultiEmail
                    inputClassName='popup-recipients-email-input'
                    emails={recipientEmails}
                    onChange={setRecipientEmails}
                    getLabel={(
                      email: string,
                      index: number,
                      removeEmail: (index: number) => void,
                    ) => {
                      return (
                        <div className='data-tag' key={index}>
                          {email}
                          <div className='data-tag-handle' onClick={() => removeEmail(index)}>
                            <RemoveTag />
                          </div>
                        </div>
                      )
                    }}
                  />
                </div>
                <div className='line' />
                <span className='credit-calc'>
                  {recipientEmails.length} recipient total — {recipientEmails.length} credit to send
                </span>
                <Button
                  className='popup-recipients-modal-submit between'
                  text='Send'
                  disabled={recipientEmails.length === 0}
                  onClick={handleSendEmail}
                  rightElement={buttonRight}
                />
              </div>
            </Sheet.Content>
          </Sheet.Container>
          <Sheet.Backdrop
            style={{ backdropFilter: 'blur(10px)', height: 'calc(100% - 80px)' }}
            onTap={toggle}
          />
        </Sheet>
      )}
    </AnimatePresence>
  )
}
