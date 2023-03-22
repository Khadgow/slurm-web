import { createSlice } from '@reduxjs/toolkit'
import { User } from 'modules/auth'

const name = '@@app'

export interface AppState {
  currentUser?: User
}

const initialState: AppState = {
  currentUser: undefined,
}

export const appSlice = createSlice({
  name,
  initialState,
  reducers: {
    setCurrentUser(state, { payload }) {
      state.currentUser = payload
    },
  },
})

export const { actions: appActions, reducer: appReducer } = appSlice
