import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios'

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

request.interceptors.response.use(setJWTLocalStorage)

export { request }
