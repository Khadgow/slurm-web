import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useGetUsersQuery } from '../api'
import { Loader } from 'components/Loader'

export const OsUsersList = () => {
  const { data, isFetching } = useGetUsersQuery()

  if (isFetching) {
    return <Loader />
  }

  if (!isFetching && !data) {
    return <div>Нету данных</div>
  }
  return (
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
          {data.map(({ id, name, password }) => (
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
  )
}
