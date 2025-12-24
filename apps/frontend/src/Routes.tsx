import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { DashBoardPage } from './pages/Dashboard'
import { OrdersDetail } from './pages/OrdersDetail'

const router = createBrowserRouter([
  {
    path: '/dashboard',
    element: <DashBoardPage />,
  },
  {
    path: '/orders/:id',
    element: <OrdersDetail />,
  },
  {
    path: '*',
    element: <Navigate to="/dashboard" replace={true} />,
  },
])

export function Routes() {
  return <RouterProvider router={router} />
}
