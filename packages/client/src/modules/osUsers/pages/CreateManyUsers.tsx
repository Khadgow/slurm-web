import { useCreateManyUsersMutation } from '../api'
import { CreateManyUsersRequest } from '../api/requests'
import { CreateManyUsersForm } from '../components/CreateManyUsersForm'
import { ListOfCreatedUsers } from '../components/ListOfCreatedUsers'
import { Box } from '@mui/material'
import { Loader } from 'components/Loader'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { isErrorWithMessage } from 'utils/isErrorWithMessage'

export const CreateManyUsers = () => {
  const [createManyUsers, { data, isSuccess, isLoading, error }] =
    useCreateManyUsersMutation()

  const onSubmit = (values: CreateManyUsersRequest) => {
    createManyUsers({ ...values, quantity: Number(values.quantity) })
  }

  useEffect(() => {
    if (error && isErrorWithMessage(error)) {
      toast.error(error.data.message)
    }
  }, [error])

  if (isLoading) {
    return <Loader />
  }

  if (isSuccess && data) {
    return <ListOfCreatedUsers users={data} />
  }
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <h2>Создание пользователей</h2>
      <CreateManyUsersForm onSubmit={onSubmit} />
    </Box>
  )
}
