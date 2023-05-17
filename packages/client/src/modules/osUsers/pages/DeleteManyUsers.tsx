import { useDeleteManyUsersMutation, useGetGroupsQuery } from '../api'
import { DeleteManyUsersRequest } from '../api/requests'
import { Box } from '@mui/material'
import { Loader } from 'components/Loader'
import { DeleteManyUsersForm } from '../components/DeleteManyUsersForm'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { isErrorWithMessage } from 'utils/isErrorWithMessage'

export const DeleteManyUsers = () => {
  const [deleteManyUsers, { isSuccess, isLoading, error }] =
    useDeleteManyUsersMutation()

  const { data, isLoading: isGroupsLoading } = useGetGroupsQuery()
  const navigate = useNavigate()

  const options =
    data?.map(({ id, name }) => ({ value: id, label: name })) || []

  const onSubmit = (values: DeleteManyUsersRequest) => {
    deleteManyUsers({
      ...values,
      startIndex: Number(values.startIndex),
      endIndex: Number(values.endIndex),
    })
  }

  useEffect(() => {
    if (error && isErrorWithMessage(error)) {
      toast.error(error.data.message)
    }
  }, [error])

  useEffect(() => {
    if (isSuccess) {
      toast.success('Пользователи удалены')
      navigate('/users')
    }
  }, [isSuccess, navigate])

  if (isLoading) {
    return <Loader />
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <h2>Удаление пользователей</h2>
      <DeleteManyUsersForm
        onSubmit={onSubmit}
        options={options}
        isOptionsLoading={isGroupsLoading}
      />
    </Box>
  )
}
