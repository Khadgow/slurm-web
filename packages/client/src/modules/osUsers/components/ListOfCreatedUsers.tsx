import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import { OsUser } from '../models'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { FC } from 'react'

interface ListOfCreatedUsersProps {
  users: OsUser[]
}

export const ListOfCreatedUsers: FC<ListOfCreatedUsersProps> = ({ users }) => {
  const navigate = useNavigate()

  const onBack = () => {
    navigate('/users')
  }

  return (
    <>
      <Button onClick={onBack}>Вернуться</Button>
      <h2>Созданные пользователи</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">Имя пользователя</TableCell>
              <TableCell align="right">Пароль</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(({ id, name, password }) => (
              <TableRow
                key={id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {id}
                </TableCell>
                <TableCell align="right">{name}</TableCell>
                <TableCell align="right">{password}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
