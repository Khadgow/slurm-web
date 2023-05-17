import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import { Loader } from 'components/Loader'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import { PasswordField } from './PasswordField'
import { IconButton } from '@mui/material'
import FolderCopyIcon from '@mui/icons-material/FolderCopy'
import DeleteIcon from '@mui/icons-material/Delete'
import { DeleteUserModal } from './modals/DeleteUserModal'
import { CopyDirectoryModal } from './modals/CopyDirectoryModal'
import { useState } from 'react'
import { useModal } from 'utils/useModal'
import { useGetUsersQuery } from '../api'

export const OsUsersTable = () => {
  const { data, isLoading } = useGetUsersQuery()

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
  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ display: 'flex', justifyContent: 'center' }}
      >
        {isLoading && <Loader />}
        {!isLoading && data && (
          <Table
            sx={{ minWidth: 650, maxWidth: 1000 }}
            aria-label="simple table"
          >
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
        )}
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
    </>
  )
}
