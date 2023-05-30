import axios, {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios'
import { history } from '../main'

const baseURL = import.meta.env.VITE_BASE_API_URL
const ApiTokenStorageKey = 'USER_TOKEN'

const request = axios.create({
  baseURL,
})

const setJWTHeader = (config: InternalAxiosRequestConfig) => {
  const token = window.localStorage.getItem(ApiTokenStorageKey)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}

request.interceptors.request.use(setJWTHeader)

const setJWTLocalStorage = (response: AxiosResponse) => {
  const authUrlChecker = new RegExp('/register|/login')
  if (response.config?.url && authUrlChecker.test(response.config.url)) {
    const { token } = response.data
    if (token) {
      window.localStorage.setItem(ApiTokenStorageKey, token)
    }
  }

  return response
}

const unauthorizedRedirect = (error: AxiosError) => {
  if (error.response && error.response.status === 401) {
    window.localStorage.removeItem(ApiTokenStorageKey)
    history.push('/login')
  }
  return Promise.reject(error)
}

request.interceptors.response.use(setJWTLocalStorage, unauthorizedRedirect)

export { request }
