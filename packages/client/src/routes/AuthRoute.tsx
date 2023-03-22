import { Navigate, Outlet } from 'react-router-dom'
import { useEffect, FC } from 'react'
import { useGetMeQuery } from 'modules/auth'
import { useAppDispatch } from 'store'
import { appActions } from 'store/appSlice'

export const AuthRoute: FC = () => {
  const { data, isSuccess } = useGetMeQuery()

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(appActions.setCurrentUser(data))
    }
  }, [data, dispatch, isSuccess])

  if (isSuccess) {
    return <Navigate replace to="/jobs" />
  }

  return <Outlet />
}
