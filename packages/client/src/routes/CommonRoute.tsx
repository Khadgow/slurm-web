import { Navigate, Outlet } from 'react-router-dom'
import { useEffect, FC } from 'react'
import { useGetMeQuery } from 'modules/auth'
import { isAxiosErrorError } from 'utils/isAxiosError'
import { useAppDispatch } from 'store'
import { appActions } from 'store/appSlice'
import { Navbar } from 'components/Navbar'

export const CommonRoute: FC = () => {
  const { data, error, isSuccess } = useGetMeQuery()

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(appActions.setCurrentUser(data))
    }
  }, [data, dispatch, isSuccess])

  if (error) {
    if (isAxiosErrorError(error) && error?.response?.status === 403) {
      window.localStorage.removeItem('USER_TOKEN')
    }
    return <Navigate replace to="/login" />
  }

  return (
    <Navbar>
      <Outlet />
    </Navbar>
  )
}
