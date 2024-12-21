import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ImageStyleTypes } from '../../lib/constants'

export interface FormState {
  setting: string
  from: string
  toEnd: string[]
  subject: string
  signature_name: string
  signature_email: string
  images_style: ImageStyleTypes
  eventDate: Date | null
  eventLocation: string
  buttonName: string
  buttonLink: string
  isEnableShare: boolean
  isEnableFonts: boolean
  isEnableEvent: boolean
  isEnableButton: boolean
}

type OmitFormStateFields =
  | 'toEnd'
  | 'images_style'
  | 'eventDate'
  | 'isEnableShare'
  | 'isEnableFonts'
  | 'isEnableEvent'
  | 'isEnableButton'

const initialState: FormState = {
  setting: '',
  from: '',
  toEnd: [],
  subject: '',
  signature_name: '',
  signature_email: '',
  images_style: ImageStyleTypes.auto,
  eventDate: null,
  eventLocation: '',
  buttonName: '',
  buttonLink: '',
  isEnableShare: true,
  isEnableFonts: false,
  isEnableEvent: false,
  isEnableButton: false,
}

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateField(
      state,
      action: PayloadAction<{
        field: keyof Omit<FormState, OmitFormStateFields>
        value: string
      }>,
    ) {
      const { field, value } = action.payload
      state[field] = value
    },
    clearFormData() {
      return initialState
    },
    updateRecipient(state, action: PayloadAction<string[]>) {
      state.toEnd = action.payload
    },
    updateImageStyle(state, action: PayloadAction<ImageStyleTypes>) {
      state.images_style = action.payload
    },
    updateEventDate(state, action: PayloadAction<Date | null>) {
      state.eventDate = action.payload
    },
    updateFormData(state, action: PayloadAction<FormState>) {
      state.setting = action.payload.setting
      state.subject = action.payload.subject
      state.from = action.payload.from
      state.signature_name = action.payload.signature_name
      state.signature_email = action.payload.signature_email
      state.toEnd = action.payload.toEnd
      state.eventDate = action.payload.eventDate
      state.eventLocation = action.payload.eventLocation
      state.buttonName = action.payload.buttonName
      state.buttonLink = action.payload.buttonLink
      state.isEnableShare = action.payload.isEnableShare
      state.isEnableFonts = action.payload.isEnableFonts
      state.isEnableEvent = action.payload.isEnableEvent
      state.isEnableButton = action.payload.isEnableButton
    },
    updateIsEnableShare(state, action: PayloadAction<boolean>) {
      state.isEnableShare = action.payload
    },
    updateIsEnableFonts(state, action: PayloadAction<boolean>) {
      state.isEnableFonts = action.payload
    },
    updateIsEnableEvent(state, action: PayloadAction<boolean>) {
      state.isEnableEvent = action.payload
    },
    updateIsEnableButton(state, action: PayloadAction<boolean>) {
      state.isEnableButton = action.payload
    }
  },
})

export const {
  updateField,
  clearFormData,
  updateImageStyle,
  updateRecipient,
  updateFormData,
  updateEventDate,
  updateIsEnableShare,
  updateIsEnableFonts,
  updateIsEnableEvent,
  updateIsEnableButton,
} = formSlice.actions
export default formSlice.reducer
