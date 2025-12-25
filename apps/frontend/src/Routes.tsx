import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { DashBoardPage } from './pages/Dashboard'
import { OrdersDetail } from './pages/OrdersDetail'
import { MainLayout } from './layout/MainLayout'

const router = createBrowserRouter([
  {
    path: '/dashboard',
    element: (
      <MainLayout>
        <DashBoardPage />
      </MainLayout>
    ),
  },
  {
    path: '/orders/:id',
    element: (
      <MainLayout>
        <OrdersDetail />
      </MainLayout>
    ),
  },
  {
    path: '*',
    element: <Navigate to="/dashboard" replace={true} />,
  },
])

export function Routes() {
  return <RouterProvider router={router} />
}
