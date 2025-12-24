import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { DashBoardPage } from './pages/Dashboard'

const router = createBrowserRouter([
  {
    path: '/dashboard',
    element: <DashBoardPage />,
  },
  {
    path: '/orders/:id',
    element: <DashBoardPage />,
  },
  {
    path: '*',
    element: <Navigate to="/dashboard" replace={true} />,
  },
])

export function Routes() {
  return <RouterProvider router={router} />
}
