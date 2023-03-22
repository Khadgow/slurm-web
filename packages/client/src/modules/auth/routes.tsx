import React from 'react'
import { RegisterForm, LoginForm } from './pages'
import { AuthRoute } from 'routes/AuthRoute'

export const routes = {
  login: '/login',
  register: '/register',
}

export const authRoutes = [
  {
    element: <AuthRoute />,
    children: [
      {
        path: routes.login,
        element: <LoginForm />,
      },
      {
        path: routes.register,
        element: <RegisterForm />,
      },
    ],
  },
]
