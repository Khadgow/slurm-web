import { AxiosError } from 'axios'
import { SerializedError } from '@reduxjs/toolkit'

export type RTKError = AxiosError | SerializedError | undefined

export const isAxiosErrorError = (error: RTKError): error is AxiosError =>
  error != null && error.message != null
