import React from 'react'
import { CommonRoute } from 'routes/CommonRoute'
import { Terminal } from './pages/Terminal'

export const routes = {
  terminal: '/terminal',
}

export const sshRoutes = [
  {
    element: <CommonRoute />,
    children: [
      {
        path: routes.terminal,
        element: <Terminal />,
      },
    ],
  },
]
