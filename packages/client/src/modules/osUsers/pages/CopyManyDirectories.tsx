import { useCopyManyDirectoriesMutation, useGetGroupsQuery } from '../api'
import { CopyManyDirectoriesRequest } from '../api/requests'

import { Box } from '@mui/material'
import { Loader } from 'components/Loader'
import { CopyManyDirectoriesForm } from '../components/CopyManyDirectoriesForm'

export const CopyManyDirectories = () => {
  const [copyManyDirectories, { isSuccess, isLoading }] =
    useCopyManyDirectoriesMutation()

  const { data, isLoading: isGroupsLoading } = useGetGroupsQuery()

  const options = data?.map(({ id, name }) => ({ value: id, label: name }))

  const onSubmit = (values: CopyManyDirectoriesRequest) => {
    copyManyDirectories(values)
  }

  if (isLoading) {
    return <Loader />
  }

  if (isSuccess) {
    return <div>Каталоги скопированы</div>
  }
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <h2>Копирование каталогов пользователей</h2>
      <CopyManyDirectoriesForm
        onSubmit={onSubmit}
        isOptionsLoading={isGroupsLoading}
        options={options}
      />
    </Box>
  )
}
