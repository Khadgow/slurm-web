import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useGetJobsQuery } from '../api'
import { Loader } from 'components/Loader'
import { JOB_STATE } from '../../../constants/jobState'

export const JobsList = () => {
  const { data, isFetching } = useGetJobsQuery()

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
            <TableCell align="right">Задача</TableCell>
            <TableCell align="right">Состояние</TableCell>
            <TableCell align="right">Аккаунт</TableCell>
            <TableCell align="right">Пользователь</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(({ id, jobName, state, account, userId }) => (
            <TableRow
              key={id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {id}
              </TableCell>
              <TableCell align="right">{jobName}</TableCell>
              <TableCell align="right">{JOB_STATE[state]}</TableCell>
              <TableCell align="right">{account}</TableCell>
              <TableCell align="right">{userId}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
