import React from 'react'
import { CommonRoute } from 'routes/CommonRoute'
import { CreateManyUsers, OsUsersList } from './pages'

export const routes = {
  list: '/users',
  createMany: '/users/createMany',
}

export const osUsersRoutes = [
  {
    element: <CommonRoute />,
    children: [
      {
        path: routes.list,
        element: <OsUsersList />,
      },
      {
        path: routes.createMany,
        element: <CreateManyUsers />,
      },
    ],
  },
]
