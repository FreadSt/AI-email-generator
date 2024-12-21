import React, { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button } from '../../button/Button'
import { Text } from '../../blocks/text/Text'
import error from '../../../assets/images/Danger Triangle.svg'
import creditsIcon from '../../../assets/images/credits-icon.svg'
import tabActiveFull from '../../../assets/images/Tab_Background_Full.svg'
import './style.scss'
import { Flex } from '../../blocks/flex/Flex'
import {
  updateField,
  updateImageStyle,
  updateEventDate,
  updateIsEnableShare,
  updateIsEnableFonts,
  updateIsEnableEvent,
  updateIsEnableButton,
} from '../../../store/slice/formDataSlice'
import { RootState, useAppDispatch } from '../../../store'
import { generateEmailContent } from '../../../store/thunk/testEmailGenerate'
import { ToggleSwitch } from '../../switchButton/SwitchButton'
import { BtnStars, Info } from '../../blocks/icon/Icon'
import { fetchUser } from '../../../store/slice/authSlice'
import { useAuth } from '../../../lib/hooks/useAuth'
import { setAuthModal } from '../../../store/slice/modalSlice'
import ToolTip from '../../toolTip/ToolTip'
import {
  imageStyles,
  ImageStyleTypes,
  requiredFields,
  tagOptions,
  tooltipShareText,
  tooltipFontsText,
  tooltipEventText,
  tooltipButtonText,
  formTabs,
} from '../../../lib/constants'
import clsx from 'clsx'
import CustomDatePicker from '../../datePicker/DatePicker'
import { setPage } from '../../../store/slice/paginationSlice'
import { format } from 'date-fns'
import { motion } from 'framer-motion'
import { getEmailSubjects, getFromNames } from '../../../lib/api/ai'
import arrowTop from '../../../assets/images/tooltip-arrow-top.svg'
import { useOnboarding } from '../../../lib/hooks/useOnboarding'

interface FormState {
  setting: string
  from: string
  subject: string
  signature_name: string
  signature_email: string
  eventLocation: string
  buttonName: string
  buttonLink: string
}

export const FormComponent: FC = () => {
  const dispatch = useAppDispatch()
  const { isSignedIn, user } = useAuth()
  const { loading, emailContent } = useSelector((state: RootState) => state.testEmail)
  const formData = useSelector((state: RootState) => state.formData)
  const {
    setting,
    from,
    eventDate,
    eventLocation,
    subject,
    images_style,
    signature_name,
    signature_email,
    buttonName,
    buttonLink,
    isEnableShare,
    isEnableFonts,
    isEnableEvent,
    isEnableButton,
  } = formData
  const [selectedTags, setSelectedTags] = useState<{ setting: string; from: string }>({
    setting,
    from,
  })
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isFormValid, setIsFormValid] = useState(false)
  const [itemId, setItemId] = useState(0)
  const [settingTags, setSettingTags] = useState(tagOptions.settingTags)
  const [fromTags, setFromTags] = useState(tagOptions.fromTags)
  const {
    isShowPromptOnboarding,
    isShowStyleOnboarding,
    isFinishedPromptOnboarding,
    isFinishedStyleOnboarding,
    showStyleOnboarding,
    finishPromptOnboarding,
    finishStyleOnboarding,
  } = useOnboarding()

  const onSubjectFocus = () => {
    finishPromptOnboarding()
  }

  const onStyleClick = () => {
    finishStyleOnboarding()
  }

  const onGenerateButtonMouseEnter = () => {
    if (isFinishedPromptOnboarding && !isFinishedStyleOnboarding) {
      showStyleOnboarding()
    }
  }

  const toggleItem = (id: number) => async () => {
    setItemId(id)
    if (id === 1) {
      onStyleClick()
      await fetchSettingTags()
    }
  }

  const fetchSettingTags = async () => {
    try {
      const response = await getEmailSubjects()
      if (response?.status === 200) {
        setSettingTags(response?.data ?? tagOptions.settingTags)
      }
    } catch (e) {
      console.log('fetchSettingTags error', e)
    }
  }

  const fetchFromTags = async (style: string) => {
    try {
      const response = await getFromNames(style)
      if (response?.status === 200) {
        setFromTags(response?.data ?? tagOptions.fromTags)
      }
    } catch (e) {
      console.log('fetchFromTags error', e)
    }
  }

  const onBlurSetting = async () => {
    await fetchFromTags(setting)
  }

  useEffect(() => {
    const isValid = requiredFields.every((field) => formData[field])
    const isValidEvent = isEnableEvent ? !!eventDate : true
    const isValidButton = isEnableButton ? !!buttonName && !!buttonLink : true
    setIsFormValid(isValid && isValidEvent && isValidButton && !errorMessage)
  }, [formData, eventDate, buttonName, buttonLink, errorMessage, isEnableEvent, isEnableButton])

  const handleSubmit = async () => {
    if (!isFormValid || loading) {
      return
    }

    if (!isSignedIn) {
      dispatch(setAuthModal(true))
      return
    }

    const errors = requiredFields.filter((field) => !formData[field])
    if (errors.length > 0) {
      setErrorMessage('Please fill in all the fields marked with *')
      return
    } else {
      dispatch(setPage(1))
      await dispatch(
        generateEmailContent({
          style: setting,
          from_name: from || signature_name,
          email_prompt: subject,
          signature_name,
          signature_email: signature_email || (user?.email ?? ''),
          is_public: isEnableShare,
          images_style,
          use_unsafe_fonts: isEnableFonts,
          eventDate,
          eventLocation,
          buttonName,
          buttonLink,
        }),
      )
      await dispatch(fetchUser())
      setErrorMessage(null)
    }
  }

  const handleImageStyleChange = (imageStyle: ImageStyleTypes) => () => {
    dispatch(updateImageStyle(imageStyle))
  }

  const handleInputChange = (field: keyof FormState, value: string) => {
    dispatch(updateField({ field, value }))

    if (field === 'setting' && selectedTags.setting !== value) {
      setSelectedTags((prev) => ({
        ...prev,
        setting: '',
      }))
    } else if (field === 'from' && selectedTags.from !== value) {
      setSelectedTags((prev) => ({
        ...prev,
        from: '',
      }))
    }
  }

  const handleTagClick = (field: keyof FormState, value: string) => {
    dispatch(updateField({ field, value }))
    setSelectedTags((prev) => ({
      ...prev,
      [field]: value,
    }))
    if (field === 'setting') {
      fetchFromTags(value).catch()
    }
  }

  const handleDateChange = (date: Date | null) => {
    if (date) {
      console.log('format date', format(date, 'MM/dd/yyyy h:mm aa'))
    }
    dispatch(updateEventDate(date))
  }

  const toggleShare = () => {
    dispatch(updateIsEnableShare(!isEnableShare))
  }

  const toggleFonts = () => {
    dispatch(updateIsEnableFonts(!isEnableFonts))
  }

  const toggleInvitation = () => {
    dispatch(updateIsEnableEvent(!isEnableEvent))
    dispatch(updateEventDate(null))
    dispatch(updateField({ field: 'eventLocation', value: '' }))
    if (isEnableShare && !isEnableEvent) {
      dispatch(updateIsEnableShare(false))
    }
  }

  const toggleButton = () => {
    dispatch(updateIsEnableButton(!isEnableButton))
    dispatch(updateField({ field: 'buttonName', value: '' }))
    dispatch(updateField({ field: 'buttonLink', value: '' }))
  }

  useEffect(() => {
    if (user?.name) {
      handleInputChange('signature_name', user?.name ?? '')
    }
  }, [user?.name])

  const buttonRight = () => {
    return (
      <div className='button-right'>
        <img className='button-right-icon' src={creditsIcon} alt='' role='presentation' />
        <span className='button-right-text'>{isEnableShare ? 2 : 3}</span>
      </div>
    )
  }

  return (
    <>
      <div className='form-tabs'>
        <div className='form-tabs-gap' />
        {formTabs.map(({ name, icon }, index) => {
          const isActive = index === itemId
          return (
            <div
              key={index}
              className={clsx('form-tab-wrapper', isActive && 'active')}
              onClick={toggleItem(index)}
            >
              <div
                className={clsx(
                  'form-tab',
                  index === 1 && isShowStyleOnboarding && 'style-onboarding',
                )}
              >
                <img src={icon} alt='' />
                <span>{name}</span>
              </div>
              {isActive ? (
                <motion.img
                  src={tabActiveFull}
                  alt=''
                  className='tab-active-bg'
                  layoutId='tabActiveFull'
                  transition={{ duration: 0.3 }}
                />
              ) : null}
            </div>
          )
        })}
        <div className='form-tabs-gap' />
      </div>
      <div className='form-container'>
        <form className='form'>
          {itemId === 0 && (
            <>
              <Flex direction='column' gap={15}>
                <label htmlFor='subject'>
                  Email content (message)<p>*</p>
                </label>
                <Text color='var(--dino-white)' opacity={0.7} fontSize='14px'>
                  What is it you want to tell your friends about? <br />
                  (If you want to address somebody by name, mention specific place or date, etc., —
                  write it all here)
                </Text>
                <div
                  className={clsx('form-subject', isShowPromptOnboarding && 'subject-onboarding')}
                >
                  <textarea
                    placeholder='Remind Jeff we’re having a Christmas party at Debora’s place on December 24th, from 6pm to Midnight...'
                    id='subject'
                    rows={5}
                    value={subject}
                    onChange={(e) =>
                      dispatch(updateField({ field: 'subject', value: e.target.value }))
                    }
                    onFocus={onSubjectFocus}
                  />
                  {isShowPromptOnboarding && (
                    <div className='prompt-tooltip' style={{ top: 170, left: '50%' }}>
                      <img src={arrowTop} className='tooltip-arrow' alt='' role='presentation' />
                      <div className='tooltip-inner'>
                        <p className='tooltip-title'>Start With the Prompt</p>
                        <p>
                          Fill in the ‘Email Content (message)’ box, it will be the core of your
                          future email
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </Flex>
              <div className='line' />
              <Flex justify='space-between'>
                <Flex align='center' gap={5}>
                  <Text
                    text="It's an event"
                    fontSize='16px'
                    color='var(--dino-white)'
                    fontWeight='500'
                    styles={{ paddingRight: 0 }}
                  />
                  <ToolTip text={tooltipEventText}>
                    <Info />
                  </ToolTip>
                </Flex>
                <ToggleSwitch isToggled={isEnableEvent} onToggle={toggleInvitation} />
              </Flex>
              {isEnableEvent && (
                <>
                  <div className='line' />
                  <Flex direction='column' gap={15}>
                    <label htmlFor='eventDate'>
                      Date and time<p>*</p>
                    </label>
                    <CustomDatePicker
                      selectedDate={eventDate}
                      onDateChange={handleDateChange}
                      label='Select a Date'
                    />
                  </Flex>
                  <Flex direction='column' gap={15}>
                    <label htmlFor='eventLocation'>Location</label>
                    <Text color='var(--dino-white)' opacity={0.7} fontSize='14px'>
                      Where your event will be taking place?
                    </Text>
                    <input
                      type='text'
                      placeholder='Your event’s address.'
                      id='eventLocation'
                      name='eventLocation'
                      value={eventLocation}
                      onChange={(e) => handleInputChange('eventLocation', e.target.value)}
                    />
                  </Flex>
                </>
              )}
              <div className='line' />
              <Flex justify='space-between'>
                <Flex align='center' gap={5}>
                  <Text
                    text='Add Link (button)'
                    fontSize='16px'
                    color='var(--dino-white)'
                    fontWeight='500'
                    styles={{ paddingRight: 0 }}
                  />
                  <ToolTip text={tooltipButtonText}>
                    <Info />
                  </ToolTip>
                </Flex>
                <ToggleSwitch isToggled={isEnableButton} onToggle={toggleButton} />
              </Flex>
              {isEnableButton && (
                <>
                  <Flex direction='column' gap={15}>
                    <label htmlFor='buttonName'>
                      Link details<p>*</p>
                    </label>
                    <div className='twin-input-container'>
                      <input
                        type='text'
                        className='first-i'
                        placeholder='Link name'
                        id='buttonName'
                        name='buttonName'
                        value={buttonName}
                        onChange={(e) =>
                          dispatch(updateField({ field: 'buttonName', value: e.target.value }))
                        }
                      />
                      <input
                        type='url'
                        className='second-i'
                        placeholder='https://www...'
                        id='buttonLink'
                        name='buttonLink'
                        value={buttonLink}
                        onChange={(e) =>
                          dispatch(updateField({ field: 'buttonLink', value: e.target.value }))
                        }
                      />
                    </div>
                  </Flex>
                </>
              )}
            </>
          )}
          {itemId === 1 && (
            <>
              <Flex direction='column' gap={15}>
                <label>Email graphics style</label>
                <Text
                  color='var(--dino-white)'
                  opacity={0.7}
                  fontSize='14px'
                  text='Choose a custom style for your email'
                />
                <div className='image-styles'>
                  {imageStyles.map(({ type, text, icon }) => {
                    return (
                      <div
                        key={type}
                        className={clsx('image-style', images_style === type && 'active')}
                        onClick={handleImageStyleChange(type)}
                      >
                        <img src={icon} alt='' />
                        <span className='image-style-text'>{text}</span>
                      </div>
                    )
                  })}
                </div>
              </Flex>
              <div className='line' />
              <Flex direction='column' gap={15}>
                <label htmlFor='setting'>
                  Email theme<p>*</p>
                </label>
                <Text
                  color='var(--dino-white)'
                  opacity={0.7}
                  fontSize='14px'
                  text='Choose a TV show, movie, book or popular subject, etc.'
                />
                <input
                  type='text'
                  placeholder='Enter or select trending Email theme'
                  id='setting'
                  value={setting}
                  onChange={(e) => handleInputChange('setting', e.target.value)}
                  onBlur={onBlurSetting}
                />
                <Text
                  color='var(--dino-white)'
                  opacity={0.7}
                  fontSize='14px'
                  text='Trending themes:'
                />
                <div className='tag-container'>
                  {settingTags.map((tag, index) => (
                    <button
                      key={index}
                      type='button'
                      className={`tag-button ${selectedTags.setting === tag ? 'selected-tag' : ''}`}
                      onClick={() => handleTagClick('setting', tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </Flex>
              <div className='line' />
              <Flex direction='column' gap={15}>
                <label htmlFor='from'>Character</label>
                <Text
                  text='Whose character (fictional or non-fictional) do you want this email to be sent by? This will affect the writing style and will also be the Sender’s name in recipient’s inbox.'
                  color='var(--dino-white)'
                  opacity={0.7}
                  fontSize='14px'
                />
                <input
                  type='text'
                  placeholder='Enter or select trending Character name'
                  id='from'
                  value={from}
                  onChange={(e) => handleInputChange('from', e.target.value)}
                />
                {fromTags.length > 0 && (
                  <>
                    <Text
                      text='Suggested characters:'
                      color='var(--dino-white)'
                      opacity={0.7}
                      fontSize='14px'
                    />
                    <div className='tag-container'>
                      {fromTags.map((tag, index) => (
                        <button
                          key={index}
                          type='button'
                          className={`tag-button ${selectedTags.from === tag ? 'selected-tag' : ''}`}
                          onClick={() => handleTagClick('from', tag)}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </Flex>
            </>
          )}
          {itemId === 2 && (
            <>
              <Flex justify='space-between'>
                <Flex align='center' gap={5}>
                  <Text
                    text='Share Email to community'
                    fontSize='16px'
                    color='var(--dino-white)'
                    fontWeight='500'
                    styles={{ paddingRight: 0 }}
                  />
                  <ToolTip text={tooltipShareText}>
                    <Info />
                  </ToolTip>
                </Flex>
                <Flex align='center' justify='flex-end' gap={10}>
                  <div className='switch-info'>
                    <span className='switch-info-text'>Save 1</span>
                    <img
                      className='switch-info-icon'
                      src={creditsIcon}
                      alt=''
                      role='presentation'
                    />
                  </div>
                  <ToggleSwitch isToggled={isEnableShare} onToggle={toggleShare} />
                </Flex>
              </Flex>
              <div className='line' />
              <Flex justify='space-between'>
                <Flex align='center' gap={5}>
                  <Text
                    text='Allow custom fonts'
                    fontSize='16px'
                    color='var(--dino-white)'
                    fontWeight='500'
                    styles={{ paddingRight: 0 }}
                  />
                  <ToolTip text={tooltipFontsText}>
                    <Info />
                  </ToolTip>
                </Flex>
                <ToggleSwitch isToggled={isEnableFonts} onToggle={toggleFonts} />
              </Flex>
              <div className='line' />
              <Flex direction='column' gap={15}>
                <label htmlFor='signature_name'>
                  Your signature<p>*</p>
                </label>
                <Text
                  text='Let recipient know who sent the email.'
                  color='var(--dino-white)'
                  opacity={0.7}
                  fontSize='14px'
                />
                <input
                  type='text'
                  className='first-i'
                  placeholder='Your name'
                  id='signature_name'
                  value={signature_name}
                  onChange={(e) => handleInputChange('signature_name', e.target.value)}
                />
              </Flex>
            </>
          )}
          <div className='line outer' />
          {errorMessage && (
            <Flex>
              <img src={error} alt='' />
              <span className='error-span'>{errorMessage}</span>
            </Flex>
          )}
          {isShowStyleOnboarding && (
            <div className='style-tooltip' style={{ top: 80, left: 290 }}>
              <img src={arrowTop} className='tooltip-arrow' alt='' role='presentation' />
              <div className='tooltip-inner'>
                <p className='tooltip-title'>Tailor your email your way</p>
                <p>
                  Choose a design style, set the theme, and select a character to make it uniquely
                  yours.
                </p>
              </div>
            </div>
          )}
        </form>
      </div>
      <div className='btn-container' onMouseEnter={onGenerateButtonMouseEnter}>
        <Button
          text={loading ? 'Generating' : `Generate ${emailContent ? 'new' : 'an'} email`}
          type='submit'
          width='100%'
          LeftSvgIcon={BtnStars}
          rightElement={buttonRight}
          className='submit-form-button'
          onClick={handleSubmit}
          disabled={!isFormValid}
        />
      </div>
    </>
  )
}
