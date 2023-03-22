import React from 'react'
import { CommonRoute } from 'routes/CommonRoute'
import { JobsList } from './pages/'

export const routes = {
  list: '/jobs',
}

export const jobsRoutes = [
  {
    element: <CommonRoute />,
    children: [
      {
        path: routes.list,
        element: <JobsList />,
      },
    ],
  },
]
