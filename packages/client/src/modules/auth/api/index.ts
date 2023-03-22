import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react'
import { Credentials, RegisterFields, User } from '../models'
import { request } from 'utils/request'
import { AxiosRequestConfig, AxiosError } from 'axios'
import { TokenResponse } from './responses'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: request as BaseQueryFn<AxiosRequestConfig, unknown, AxiosError>,
  tagTypes: ['User', 'ME'],
  endpoints: (builder) => ({
    login: builder.mutation<TokenResponse, Credentials>({
      query(credentials) {
        return {
          url: '/login',
          method: 'POST',
          data: credentials,
        }
      },
    }),
    register: builder.mutation<TokenResponse, RegisterFields>({
      query(data) {
        return {
          url: '/register',
          method: 'POST',
          data,
        }
      },
    }),
    getMe: builder.query<User, void>({
      query() {
        return {
          url: 'web-users/me',
          method: 'GET',
        }
      },
      providesTags: ['ME'],
    }),
    logout: builder.mutation<void, void>({
      query() {
        return {
          url: 'web-users/me',
          method: 'GET',
        }
      },
      invalidatesTags: ['ME'],
    }),
  }),
})

export const {
  useLoginMutation,
  useGetMeQuery,
  useLogoutMutation,
  useRegisterMutation,
} = authApi
