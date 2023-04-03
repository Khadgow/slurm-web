import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react'
import { GroupWithUsers, OsUser, UserGroup } from '../models'
import { request } from 'utils/request'
import { AxiosRequestConfig, AxiosError } from 'axios'
import {
  CopyManyDirectoriesRequest,
  CreateManyUsersRequest,
  DeleteManyUsersRequest,
} from './requests'

export const osUsersApi = createApi({
  reducerPath: 'osUsersApi',
  baseQuery: request as BaseQueryFn<AxiosRequestConfig, unknown, AxiosError>,
  tagTypes: ['Users', 'Groups'],
  endpoints: (builder) => ({
    getUsers: builder.query<OsUser[], void>({
      query() {
        return {
          url: '/os-users',
          method: 'GET',
        }
      },
      providesTags: ['Users'],
    }),
    createManyUsers: builder.mutation<OsUser[], CreateManyUsersRequest>({
      query(data) {
        return {
          url: '/os-users/create-many',
          method: 'POST',
          data,
        }
      },
      invalidatesTags: ['Users', 'Groups'],
    }),
    deleteManyUsers: builder.mutation<void, DeleteManyUsersRequest>({
      query(data) {
        return {
          url: '/os-users/delete-many',
          method: 'POST',
          data,
        }
      },
      invalidatesTags: ['Users'],
    }),
    deleteUser: builder.mutation<void, number>({
      query(id) {
        return {
          url: `/os-users/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: ['Users'],
    }),
    getGroups: builder.query<UserGroup[], void>({
      query() {
        return {
          url: '/os-user-groups',
          method: 'GET',
        }
      },
      providesTags: ['Groups'],
    }),
    getGroupById: builder.query<GroupWithUsers, number>({
      query(id) {
        return {
          url: `/os-user-groups/${id}`,
          method: 'GET',
        }
      },
      providesTags: ['Groups'],
    }),
    copyManyDirectories: builder.mutation<void, CopyManyDirectoriesRequest>({
      query(data) {
        return {
          url: '/os-users/copy-many-directories',
          method: 'POST',
          data,
        }
      },
    }),
    copyDirectory: builder.mutation<void, number>({
      query(id) {
        return {
          url: `/os-users/copy/${id}`,
          method: 'POST',
        }
      },
    }),
  }),
})

export const {
  useGetUsersQuery,
  useCreateManyUsersMutation,
  useDeleteManyUsersMutation,
  useGetGroupsQuery,
  useGetGroupByIdQuery,
  useCopyManyDirectoriesMutation,
  useDeleteUserMutation,
  useCopyDirectoryMutation,
} = osUsersApi
