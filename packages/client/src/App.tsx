import React from 'react'
import { Navigate, useRoutes } from 'react-router-dom'

import { authRoutes } from 'modules/auth'
import { jobsRoutes } from 'modules/jobs'
import { osUsersRoutes } from './modules/osUsers'
import { sshRoutes } from './modules/ssh'

export const App = () => {
  const element = useRoutes([
    ...authRoutes,
    ...jobsRoutes,
    ...osUsersRoutes,
    ...sshRoutes,
    {
      element: <Navigate to={'/login'} />,
      path: '/',
    },
  ])
  return element
}
