import React from 'react'
import { CommonRoute } from 'routes/CommonRoute'
import { CreateManyUsers, OsUsersList } from './pages'
import { DeleteManyUsers } from './pages/DeleteManyUsers'
import { CopyManyDirectories } from './pages/CopyManyDirectories'

export const routes = {
  list: '/users',
  createMany: '/users/createMany',
  deleteMany: '/users/deleteMany',
  copyManyDirectories: '/users/copyMany',
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
      {
        path: routes.deleteMany,
        element: <DeleteManyUsers />,
      },
      {
        path: routes.copyManyDirectories,
        element: <CopyManyDirectories />,
      },
    ],
  },
]
