import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react'
import { Cluster, Job } from '../models'
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
    getJobsByClusterName: builder.query<Job[], string>({
      query(name) {
        return {
          url: `/jobs/${name}`,
          method: 'GET',
        }
      },
    }),
    getClusters: builder.query<Cluster[], void>({
      query() {
        return {
          url: '/clusters',
          method: 'GET',
        }
      },
    }),
  }),
})

export const {
  useGetJobsQuery,
  useGetClustersQuery,
  useGetJobsByClusterNameQuery,
} = jobsApi
