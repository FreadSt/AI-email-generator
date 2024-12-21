import http from '../utils/http'

export interface Email {
  id: string
  preview_url: string
  time: number
  user_info: {
    name: string,
    picture: string
  }
}

export async function getMeEmails() {
  try {
    return http.get<Email[]>('/api/email/list/me')
  } catch (e) {
    console.log('googleSignIn error', e)
  }
}

export async function getAllEmails() {
  try {
    return http.get<Email[]>('/api/email/list/all')
  } catch (e) {
    console.log('googleSignIn error', e)
  }
}
