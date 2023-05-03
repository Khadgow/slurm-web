import Table from '@mui/material/Table'
import Box from '@mui/material/Box'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useGetUsersQuery } from '../api'
import { Loader } from 'components/Loader'
import { Button, IconButton, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'
import FolderCopyIcon from '@mui/icons-material/FolderCopy'
import { useModal } from 'utils/useModal'
import { DeleteUserModal } from '../components/modals/DeleteUserModal'
import { CopyDirectoryModal } from '../components/modals/CopyDirectoryModal'
import { useState } from 'react'
import { PasswordField } from '../components/PasswordField'

export const OsUsersList = () => {
  const { data, isFetching } = useGetUsersQuery()
  const navigate = useNavigate()

  const [userIdToDelete, setUserIdToDelete] = useState<number>()
  const [userIdToCopyDirectory, setUserIdToCopyDirectory] = useState<number>()

  const deleteUserModal = useModal()
  const copyDirectoryModal = useModal()

  const onDelete = (id: number) => () => {
    setUserIdToDelete(id)
    deleteUserModal.open()
  }

  const onCopyDirectory = (id: number) => () => {
    setUserIdToCopyDirectory(id)
    copyDirectoryModal.open()
  }

  if (isFetching) {
    return <Loader />
  }

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
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
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
      <TableContainer
        component={Paper}
        sx={{ display: 'flex', justifyContent: 'center' }}
      >
        <Table sx={{ minWidth: 650, maxWidth: 1000 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">Имя пользователя</TableCell>
              <TableCell align="right">Пароль</TableCell>
              <TableCell align="center">Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(({ id, name, password }) => (
              <TableRow
                key={id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {id}
                </TableCell>
                <TableCell align="right">{name}</TableCell>
                <TableCell align="right" sx={{ minWidth: 200 }}>
                  <PasswordField password={password} />
                </TableCell>
                <TableCell align="center">
                  <IconButton color="primary" onClick={onCopyDirectory(id)}>
                    <FolderCopyIcon />
                  </IconButton>
                  <IconButton color="error" onClick={onDelete(id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <DeleteUserModal
        open={deleteUserModal.isOpened}
        onClose={deleteUserModal.close}
        userId={userIdToDelete}
      />
      <CopyDirectoryModal
        open={copyDirectoryModal.isOpened}
        onClose={copyDirectoryModal.close}
        userId={userIdToCopyDirectory}
      />
    </Box>
  )
}
