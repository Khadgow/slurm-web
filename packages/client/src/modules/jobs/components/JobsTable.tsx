import { Job } from '../models'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import { JOB_STATE } from 'constants/jobState'
import { Loader } from 'components/Loader'
import { FC } from 'react'

interface JobsTableProps {
  jobs?: Job[]
  isLoading?: boolean
}

export const JobsTable: FC<JobsTableProps> = ({ jobs, isLoading }) => {
  if (isLoading) {
    return <Loader />
  }

  if (!jobs?.length) {
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
          {!!jobs?.length &&
            jobs.map(({ id, jobName, state, account, userId }) => (
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
