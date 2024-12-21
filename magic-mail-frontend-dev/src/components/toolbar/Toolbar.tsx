import React, { FC } from 'react'
import './style.scss'
import { Laptop, Mobile, SubjectArrow } from '../blocks/icon/Icon'
import { setDesktop, setMobile } from '../../store/slice/layoutSlice'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../store'
import { useDimensions } from '../../lib/hooks/useDimensions'

const trimText = (text: string, maxLength: number) => {
  return text && text.length > maxLength ? text.slice(0, maxLength) + '...' : text
}

export const Toolbar: FC = () => {
  const dispatch = useAppDispatch()
  const layout = useSelector((state: RootState) => state.layout.layout)
  const formData = useSelector((state: RootState) => state.formData)
  const content = useSelector((state: RootState) => state.testEmail.emailContent)
  const { isMobile } = useDimensions()

  const subjectIndex = content?.subject ? content?.subject.indexOf(' [') : -1;
  const subject = content?.subject ? content?.subject.slice(0, subjectIndex) : ''

  const trimmedFrom = trimText(formData.from || formData.signature_name, 20)
  const trimmedSubject = trimText(subject, isMobile ? 35 : 50)

  const handleDesktopClick = () => dispatch(setDesktop())
  const handleMobileClick = () => dispatch(setMobile())
  return (
    <div className='toolbar-box'>
      <section className='user-data'>
        <SubjectArrow />
        <p className='signature'>{trimmedFrom}</p>
        <h4 className='subject'>{trimmedSubject}</h4>
      </section>
      <div className='layout-toggle-box'>
        <Laptop
          onClick={handleDesktopClick}
          className={layout === 'desktop' ? 'desktop_active' : ''}
        />
        <Mobile
          onClick={handleMobileClick}
          className={layout === 'mobile' ? 'mobile_active' : ''}
        />
      </div>
    </div>
  )
}
