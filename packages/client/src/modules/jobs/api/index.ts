import { createApi } from '@reduxjs/toolkit/query/react'
import { Cluster, Job } from '../models'
import {axiosBaseQuery} from "utils/axiosBaseQuery";

export const jobsApi = createApi({
  reducerPath: 'jobsApi',
  baseQuery: axiosBaseQuery,
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
