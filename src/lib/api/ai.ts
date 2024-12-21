import http from '../utils/http'

export async function getEmailSubjects() {
  try {
    return http.get<string[]>('/api/ai/content/email-subject')
  } catch (e) {
    console.log('getEmailSubjects error', e)
  }
}

export async function getFromNames(style: string) {
  try {
    return http.post('/api/ai/content/from-name', { style })
  } catch (e) {
    console.log('getFromNames error', e)
  }
}
