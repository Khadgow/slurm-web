import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react'
import { Job } from '../models'
import { request } from 'utils/request'
import { AxiosRequestConfig, AxiosError } from 'axios'

export const jobsApi = createApi({
  reducerPath: 'jobsApi',
  baseQuery: request as BaseQueryFn<AxiosRequestConfig, unknown, AxiosError>,
  tagTypes: ['Jobs'],
  endpoints: (builder) => ({
    getJobs: builder.query<Job[], void>({
      query() {
        return {
          url: '/jobs',
          method: 'GET',
        }
      },
    }),
  }),
})

export const { useGetJobsQuery } = jobsApi
