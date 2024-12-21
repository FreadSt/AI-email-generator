import React, { FC, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './style.scss'
import { setHours, setMinutes, format } from 'date-fns'
import calendarIcon from '../../assets/images/calendar-event.svg'

interface DatePickerWithTimeInputProps {
  selectedDate: Date | null
  onDateChange: (date: Date | null) => void
  label?: string
  inlineCalendarOnly?: boolean
}

const formatSingleLetterWeekDay = (day: string) => day.charAt(0)

const CustomTimeInput: React.FC<DatePickerWithTimeInputProps> = ({
  selectedDate,
  onDateChange,
}) => {
  const [time, setTime] = useState(format(selectedDate || new Date(), 'HH:mm'))

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const [hours, minutes] = event.target.value.split(':').map(Number)
    if (selectedDate) {
      const newDate = setMinutes(setHours(selectedDate, hours), minutes)
      setTime(event.target.value)
      onDateChange(newDate)
    }
  }

  return <input type='time' value={time} onChange={handleTimeChange} className='time-input' />
}

const CustomDatePicker: FC<DatePickerWithTimeInputProps> = ({
  selectedDate,
  onDateChange,
  inlineCalendarOnly,
}) => {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={onDateChange}
      inline={inlineCalendarOnly}
      showPopperArrow={!inlineCalendarOnly}
      className='date-picker'
      placeholderText='MM/DD/YYYY, --:-- AM EST'
      name='eventDate'
      id='eventDate'
      formatWeekDay={(dayOfWeek) => formatSingleLetterWeekDay(dayOfWeek)}
      showTimeInput
      customTimeInput={<CustomTimeInput selectedDate={selectedDate} onDateChange={onDateChange} />}
      showIcon
      showTimeSelect={false}
      dateFormat="MM/dd/yyyy h:mm aa"
      icon={<img src={calendarIcon} alt='Calendar Icon' width='24' height='24' />}
    />
  )
}

export default CustomDatePicker
