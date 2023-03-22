import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import { authApi } from 'modules/auth'
import { jobsApi } from 'modules/jobs'
import { appReducer } from 'store/appSlice'

export const createStore = () =>
  configureStore({
    reducer: {
      [authApi.reducerPath]: authApi.reducer,
      [jobsApi.reducerPath]: jobsApi.reducer,
      app: appReducer,
    },
    middleware: (getDefaultMiddleware) => [
      ...getDefaultMiddleware(),
      authApi.middleware,
      jobsApi.middleware,
    ],
  })

export const store = createStore()

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export type RootState = ReturnType<typeof store.getState>
export const selectCurrentUser = (state: RootState) => state.app.currentUser
