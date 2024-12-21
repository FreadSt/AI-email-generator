import { createAsyncThunk } from '@reduxjs/toolkit'
import http from '../../lib/utils/http'
import { setOopsModal, setOutOfCreditsModal } from '../slice/modalSlice'
import axios, { AxiosError } from 'axios'
import { ImageStyleTypes } from '../../lib/constants'
import { format } from 'date-fns'

interface EmailData {
  style: string
  from_name: string
  images_style: ImageStyleTypes
  email_prompt: string
  signature_name: string
  signature_email: string
  is_public: boolean
  use_unsafe_fonts: boolean
  eventDate: Date | null
  eventLocation: string
  buttonName: string
  buttonLink: string
}

export const generateEmailContent = createAsyncThunk<any, EmailData, { rejectValue: string }>(
  'email/generateEmailContent',
  async (emailData: EmailData, { rejectWithValue, dispatch }) => {
    try {
      const response = await http.post('/api/ai/content/generate-email', {
        style: emailData.style,
        from_name: emailData.from_name,
        images_style: emailData.images_style,
        email_prompt: emailData.email_prompt,
        signature_name: emailData.signature_name,
        signature_email: emailData.signature_email,
        is_public: emailData.is_public,
        use_unsafe_fonts: emailData.use_unsafe_fonts,
        ...(!!emailData.eventDate && {
          event: {
            date: format(emailData.eventDate, 'MM/dd/yyyy h:mm aa'),
            location: emailData.eventLocation,
          },
        }),
        ...(!!emailData.buttonName &&
          !!emailData.buttonLink && {
            button: { name: emailData.buttonName, link: emailData.buttonLink },
          }),
      })
      return response.data
    } catch (e) {
      const error = e as Error | AxiosError
      if (axios.isAxiosError(error)) {
        if (error.response?.data.toLowerCase() === 'insufficient credits') {
          dispatch(setOutOfCreditsModal(true))
        } else {
          dispatch(setOopsModal(true))
        }
        console.log(error.response?.data.message)
      } else {
        console.log(error.message)
        dispatch(setOopsModal(true))
      }
      return rejectWithValue('An error occurred')
    }
  },
)
