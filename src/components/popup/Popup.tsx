import React, { ChangeEventHandler, useEffect, useRef, useState } from 'react'
import { Flex } from '../blocks/flex/Flex'
import { Text } from '../blocks/text/Text'
import { Button } from '../button/Button'
import Modal from '../modal/Modal'
import './style.scss'
import { useSelector } from 'react-redux'
import { EmailDTO, sendEmail } from '../../store/slice/emailSlice'
import { RootState, useAppDispatch } from '../../store'
import { ToggleSwitch } from '../switchButton/SwitchButton'
import { ReactMultiEmail } from 'react-multi-email'
import 'react-multi-email/dist/style.css'
import { RemoveTag } from '../blocks/icon/Icon'
import { updateRecipient } from '../../store/slice/formDataSlice'
import { fetchUser } from '../../store/slice/authSlice'
import { setOopsModal, setPermissionsModal } from '../../store/slice/modalSlice'
import { useOutsideClick } from '../../lib/hooks/useOutsideClick'
import { AnimatePresence } from 'framer-motion'
import creditsIcon from '../../assets/images/credits-icon.svg'
import addIcon from '../../assets/images/user-add.svg'
import { useDimensions } from '../../lib/hooks/useDimensions'
import { Sheet } from 'react-modal-sheet'
import { useAuth } from '../../lib/hooks/useAuth'
import arrow from '../../assets/images/tooltip-arrow-bottom.svg'
import { useOnboarding } from '../../lib/hooks/useOnboarding'
import clsx from 'clsx'

export const Popup: React.FC = () => {
  const dispatch = useAppDispatch()
  const { isMobile, keyboardHeight } = useDimensions()
  const { user } = useAuth()
  const { sendingStatus } = useSelector((state: any) => state.email)
  const { emailContent } = useSelector((state: RootState) => state.testEmail)
  const formData = useSelector((state: RootState) => state.formData)
  const [isMultipleRecipients, setIsMultipleRecipients] = useState(false)
  const [recipientEmails, setRecipientEmails] = useState<string[]>(formData.toEnd)
  const [singleRecipientEmail, setSingleRecipientEmail] = useState<string[]>(
    formData.toEnd.length < 2 ? formData.toEnd : [],
  )
  const [isModalOpen, setIsModalOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const {
    isShowSendOnboarding,
    isFinishedSendOnboarding,
    isFinishedPromptOnboarding,
    isFinishedStyleOnboarding,
    showSendOnboarding,
    finishAllOnboardings,
  } = useOnboarding()

  const toggle = () => {
    setIsModalOpen(false)
    finishAllOnboardings()
  }

  const ref = useOutsideClick(toggle)

  useEffect(() => {
    dispatch(
      updateRecipient(isMultipleRecipients || isMobile ? recipientEmails : singleRecipientEmail),
    )
  }, [recipientEmails, singleRecipientEmail, isMultipleRecipients, isMobile, dispatch])

  useEffect(() => {
    if (
      emailContent &&
      isFinishedPromptOnboarding &&
      isFinishedStyleOnboarding &&
      !isFinishedSendOnboarding
    ) {
      showSendOnboarding()
    }
  }, [
    emailContent,
    isFinishedPromptOnboarding,
    isFinishedStyleOnboarding,
    isFinishedSendOnboarding,
  ])

  const handleSendEmail = async () => {
    if (!emailContent?.id || !formData.toEnd.length) {
      if (isMultipleRecipients) {
        setIsModalOpen(true)
      } else {
        inputRef.current?.focus()
      }
      return
    }
    const emailData: EmailDTO = {
      recipient_emails: formData.toEnd,
      email_id: emailContent.id,
      use_my_email: true,
    }
    try {
      if (user?.can_use_your_email) {
        await dispatch(sendEmail(emailData))
      } else {
        dispatch(setPermissionsModal(true))
      }
      await dispatch(fetchUser())
    } catch (error) {
      console.error('Failed to send email:', error)
      dispatch(setOopsModal(true))
    }
  }

  const handleToggle = () => {
    setIsMultipleRecipients(!isMultipleRecipients)
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleChangeSingleRecipient: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSingleRecipientEmail(e.target.value ? [e.target.value] : [])
  }

  const buttonRight = () => {
    return (
      <div className='button-right'>
        <img className='button-right-icon' src={creditsIcon} alt='' role='presentation' />
        <span className='button-right-text'>
          {isMultipleRecipients || isMobile ? recipientEmails.length || 1 : 1}
        </span>
      </div>
    )
  }

  return (
    <Flex
      className='popup-wrapper'
      direction='row'
      align='center'
      justify='space-between'
      padding={isMobile ? '10px' : '0 20px 0 0'}
      gap={isMobile ? 10 : 0}
    >
      {isMobile ? (
        <button className='manage-mobile' onClick={openModal}>
          <img src={addIcon} alt='' />
          {!!recipientEmails.length && <span>{recipientEmails.length}</span>}
        </button>
      ) : (
        <Flex
          direction='row'
          align='center'
          justify='center'
          gap={20}
          className={clsx('text-wrapper', isShowSendOnboarding && 'send-onboarding')}
          padding={isMobile ? 0 : '0 20px'}
        >
          <p className='to'>
            To<span>*</span>
          </p>
          {isMultipleRecipients ? (
            <button className='manage' onClick={openModal}>
              Manage recipients {recipientEmails.length ? `(${recipientEmails.length})` : ''}
            </button>
          ) : (
            <input
              ref={inputRef}
              name='recipient-emails'
              type='text'
              value={singleRecipientEmail}
              placeholder='Enter recipient email'
              className='recipient-input'
              onChange={handleChangeSingleRecipient}
              onFocus={finishAllOnboardings}
            />
          )}
          <Flex align='center' gap={10}>
            <Text
              text='Multiple recipients'
              color='var(--dino-white)'
              fontSize='14'
              opacity={0.5}
            />
            <ToggleSwitch isToggled={isMultipleRecipients} onToggle={handleToggle} />
          </Flex>
          {isShowSendOnboarding && (
            <div className='send-tooltip' style={{ top: -170, left: '50%' }}>
              <div className='tooltip-inner'>
                <p className='tooltip-title'>Ready to send?</p>
                <p>
                  Enter the recipient’s email here or enable ‘Multiple recipients’ to send to a
                  group.
                </p>
              </div>
              <img src={arrow} className='tooltip-arrow' alt='' role='presentation' />
            </div>
          )}
        </Flex>
      )}
      <Flex direction='row' align='center' justify='center' gap={10} className='btns-box'>
        <Button
          text={sendingStatus === 'loading' ? 'Sending...' : 'Send'}
          onClick={handleSendEmail}
          rightElement={buttonRight}
          disabled={!formData.toEnd.length}
          className='popup-send-button'
        />
      </Flex>
      <AnimatePresence>
        {isModalOpen && !isMobile && (
          <Modal
            modalClassName='popup-recipients-modal'
            modalContentClassName='popup-recipients-modal-content'
          >
            <div className='popup-recipients-modal-content-box' ref={ref}>
              <div className='popup-recipients-text-box'>
                <h3 className='title-recipients'>Manage recipients</h3>
                <p className='entering-rules'>
                  You can add up to 50 recipients, divided by ↵ Enter. Please notice that each
                  sending will cost 1 credit extra.
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
                className='popup-recipients-modal-submit'
                text='Submit'
                disabled={!formData.toEnd.length}
                onClick={closeModal}
              />
            </div>
          </Modal>
        )}
      </AnimatePresence>
      {isMobile && (
        <Sheet isOpen={isModalOpen} onClose={closeModal} detent='content-height'>
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
                  className='popup-recipients-modal-submit'
                  text='Submit'
                  disabled={!formData.toEnd.length}
                  onClick={closeModal}
                />
              </div>
            </Sheet.Content>
          </Sheet.Container>
          <Sheet.Backdrop
            style={{ backdropFilter: 'blur(10px)', height: 'calc(100% - 80px)' }}
            onTap={closeModal}
          />
        </Sheet>
      )}
    </Flex>
  )
}
