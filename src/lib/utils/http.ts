import axios from 'axios'
import { getAccessToken, removeAccessToken } from '../services/asyncStorage'
import { store } from '../../store'
import { clearAuthData } from '../../store/slice/authSlice'
import { clearFormData } from '../../store/slice/formDataSlice'
import { clearEmailContent } from '../../store/slice/testEmailSlice'

const http = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
})

http.interceptors.request.use(
  async (config) => {
    const accessToken = getAccessToken()
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

http.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response) {
      if (err.response.status === 401) {
        try {
          store.dispatch(clearFormData())
          store.dispatch(clearEmailContent())
          store.dispatch(clearAuthData())
          removeAccessToken()
        } catch (_error) {
          return Promise.reject(_error)
        }
      }
    }

    return Promise.reject(err)
  },
)

export default http
