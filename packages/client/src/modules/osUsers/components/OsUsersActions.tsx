import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { useNavigate } from 'react-router-dom'

export const OsUsersActions = () => {
  const navigate = useNavigate()

  const onCreateMany = () => {
    navigate('createMany')
  }

  const onDeleteMany = () => {
    navigate('deleteMany')
  }

  const onCopyMany = () => {
    navigate('copyMany')
  }

  return (
    <Stack direction="row" spacing={1}>
      <Button onClick={onCreateMany} variant="contained">
        Создать множество пользователей
      </Button>
      <Button onClick={onCopyMany} variant="contained" color="secondary">
        Копирование каталогов пользователей
      </Button>
      <Button onClick={onDeleteMany} variant="contained" color="error">
        Удалить множество пользователей
      </Button>
    </Stack>
  )
}
