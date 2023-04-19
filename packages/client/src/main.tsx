import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from 'App'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import {
  unstable_HistoryRouter as HistoryRouter,
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from 'store'
import './index.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const router = createBrowserRouter([{ path: '*', element: <App /> }])
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    <ToastContainer position={toast.POSITION.TOP_RIGHT} autoClose={3000} />
  </React.StrictMode>
)
