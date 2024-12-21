import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { arrayBufferToBlobUrl, retrieveImageAndDelete, storeImage } from '../utils'
import http from '../../lib/utils/http'
import axios, { AxiosError } from 'axios'
import {
  setOopsModal,
  setOutOfCreditsModal,
  setSuccessFeedbackModal,
  setSuccessModal,
} from './modalSlice'
import { getSuccessSendCount, setSuccessSendCount } from '../../lib/services/asyncStorage'

interface EmailState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  sendingStatus: 'idle' | 'loading' | 'succeeded' | 'failed'
  originalHtml: string
  html: string
  subject: string
  header: string
  images: DownloadedImage[]
  background: DownloadedImage | null
  error: string | null
  email_id: string | null
}

const initialState: EmailState = {
  status: 'idle',
  sendingStatus: 'idle',
  originalHtml: '',
  html: '',
  subject: '',
  header: '',
  images: [],
  background: null,
  error: null,
  email_id: null,
}

export interface EmailDTO {
  recipient_emails: string[]
  email_id: string
  use_my_email: boolean
}

export const sendEmail = createAsyncThunk(
  'email/sendEmail',
  async (emailData: EmailDTO, { rejectWithValue, dispatch }) => {
    try {
      const response = await http.post('/api/email/send', emailData)
      if (response.status !== 200) {
        console.error('Failed to send email')
        dispatch(setOopsModal(true))
        return
      }
      const successSendCount = getSuccessSendCount() || 0
      if (successSendCount === 0) {
        dispatch(setSuccessFeedbackModal(true))
      } else {
        dispatch(setSuccessModal(true))
      }
      setSuccessSendCount((successSendCount + 1) % 3)
      return await response.data
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

export const fetchEmailContent = createAsyncThunk(
  'email/fetchEmailContent',
  async (data: {
    email_description: string
    from_name: string
    to_name: string
    style: string
  }) => {
    const response = await http.post('/api/ai/gpt/generate-email', data)
    if (response.status !== 200) throw new Error('Failed to fetch email content')
    const content = await response.data

    if (content.background.image) {
      content.html = content.html.replace(
        `cid:${content.background.image.cid}`,
        (await (await http.post('/api/ai/ideogram/generate', content.background.image)).data).url,
      )
    }
    for (const image of content.images) {
      content.html = content.html.replace(
        `cid:${image.cid}`,
        (await (await http.post('/api/ai/ideogram/generate', image)).data).url,
      )
    }

    return {
      originalHtml: content.html,
      html: content.html,
      subject: content.subject,
      header: content.header,
      id: content.email_id,
    }
  },
)
const emailSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmailContent.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchEmailContent.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.originalHtml = action.payload.originalHtml
        state.html = action.payload.html
        state.subject = action.payload.subject
        state.header = action.payload.header
        state.email_id = action.payload.id
      })
      .addCase(fetchEmailContent.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to fetch'
      })
      .addCase(sendEmail.pending, (state) => {
        state.sendingStatus = 'loading'
      })
      .addCase(sendEmail.fulfilled, (state) => {
        state.sendingStatus = 'succeeded'
      })
      .addCase(sendEmail.rejected, (state, action) => {
        state.sendingStatus = 'failed'
        state.error = action.error.message || 'Failed to send email'
      })
  },
})

export class DownloadedImage {
  public cid: string = ''
  public blobUrl: string = ''
  public blob: Blob = new Blob()
  public internalId: string = ''
  public contentType: string = ''
  public data: string = ''

  constructor(cid: string, buffer: ArrayBuffer, contentType: string) {
    this.data = btoa(
      new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), ''),
    )
    const [blob, blobUrl] = arrayBufferToBlobUrl(buffer, contentType)
    this.blob = blob
    this.blobUrl = blobUrl
    this.cid = cid
    this.internalId = storeImage(buffer)
    this.contentType = contentType
  }

  public retrieveImageAndDelete(): ArrayBuffer {
    return retrieveImageAndDelete(this.internalId)
  }
}

export default emailSlice.reducer
