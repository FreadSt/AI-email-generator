import http from '../utils/http'
import { getIsRegistered } from '../services/asyncStorage'

interface SignInData {
  url: string
}

interface GoogleCallbackData {
  token: string
}

export interface User {
  can_use_your_email: boolean
  credits: number
  email: string
  name: string
  picture: string
}

export async function googleSignIn(userEmail?: string) {
  try {
    return http.get<SignInData>('/api/auth/google/signin', {
      params: {
        email: 1,
        login_hint: userEmail,
      },
    })
  } catch (e) {
    console.log('googleSignIn error', e)
  }
}

export async function appleSignIn() {
  try {
    return http.get<SignInData>('/api/auth/apple/signin')
  } catch (e) {
    console.log('appleSignIn error', e)
  }
}

export async function googleCallback(code: string) {
  try {
    return http.get<GoogleCallbackData>('/api/auth/google/callback', {
      params: {
        code,
        is_registred: getIsRegistered() ? 1 : 0
      }
    })
  } catch (e) {
    console.log('googleSignIn error', e)
  }
}

export async function appleCallback(code: string, token: string) {
  try {
    return http.get(`/api/auth/apple/callback?code=${code}&id_token=${token}`)
  } catch (e) {
    console.log('googleSignIn error', e)
  }
}

export async function getUser() {
  try {
    return http.get<User>('/api/auth/me')
  } catch (e) {
    console.log('getUser error', e)
  }
}

export async function deleteUser() {
  try {
    return http.delete('/api/auth/me')
  } catch (e) {
    console.log('getUser error', e)
  }
}

export function getSignOut() {
  try {
    return http.get('/api/auth/signout')
  } catch (e) {
    console.log('getSignOut error', e)
  }
}

export function getCheckAuth() {
  try {
    return http.get('/api/auth/check')
  } catch (e) {
    console.log('getSignOut error', e)
  }
}
