import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react'
import { OsUser } from '../models'
import { request } from 'utils/request'
import { AxiosRequestConfig, AxiosError } from 'axios'
import { CreateManyUsersRequest } from './requests'

export const osUsersApi = createApi({
  reducerPath: 'osUsersApi',
  baseQuery: request as BaseQueryFn<AxiosRequestConfig, unknown, AxiosError>,
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getUsers: builder.query<OsUser[], void>({
      query() {
        return {
          url: '/os-users',
          method: 'GET',
        }
      },
    }),
    createManyUsers: builder.mutation<OsUser[], CreateManyUsersRequest>({
      query(data) {
        return {
          url: '/os-users/create-many',
          method: 'POST',
          data,
        }
      },
    }),
  }),
})

export const { useGetUsersQuery, useCreateManyUsersMutation } = osUsersApi
