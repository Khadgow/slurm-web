import { useDeleteManyUsersMutation, useGetGroupsQuery } from '../api'
import { DeleteManyUsersRequest } from '../api/requests'
import { Box } from '@mui/material'
import { Loader } from 'components/Loader'
import { DeleteManyUsersForm } from '../components/DeleteManyUsersForm'

export const DeleteManyUsers = () => {
  const [deleteManyUsers, { isSuccess, isLoading }] =
    useDeleteManyUsersMutation()

  const { data, isLoading: isGroupsLoading } = useGetGroupsQuery()

  const options = data?.map(({ id, name }) => ({ value: id, label: name }))

  const onSubmit = (values: DeleteManyUsersRequest) => {
    deleteManyUsers({
      ...values,
      startIndex: Number(values.startIndex),
      endIndex: Number(values.endIndex),
    })
  }

  if (isLoading) {
    return <Loader />
  }

  if (isSuccess) {
    return <div>Пользователи удалены</div>
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
