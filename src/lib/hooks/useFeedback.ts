import emailjs from '@emailjs/browser'
import { PUBLIC_KEY, SERVICE_ID, TEMPLATE_ID } from '../constants'
import { useAuth } from './useAuth'

export const useFeedback = (message: string, rate?: string) => {
  const { user } = useAuth()
  const handleSubmit = (onSuccess?: () => void) => {
    const data = {
      name: user?.name,
      email: user?.email,
      message,
      rate
    }
    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, data, PUBLIC_KEY)
      .then(() => {
        console.log('email sent')
        onSuccess?.()
      })
      .catch((err) => {
        console.log('email error', err)
      })
  }
  return { handleSubmit }
}
