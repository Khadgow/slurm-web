import Box from '@mui/material/Box'

import { OsUsersTable } from '../components/OsUsersTable'
import { OsUsersActions } from '../components/OsUsersActions'

export const OsUsersList = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <OsUsersActions />
      <OsUsersTable />
    </Box>
  )
}
