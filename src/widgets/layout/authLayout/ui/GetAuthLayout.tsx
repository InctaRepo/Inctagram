import { ReactElement } from 'react'

import { ToastContainer } from 'react-toastify'

import { AuthProvider } from '@/shared/hoc'
import { AuthLayout } from '@/widgets/layout/authLayout/ui/AuthLayout'

export const GetAuthLayout = (page: ReactElement) => {
  return (
    <>
      <AuthProvider>
        <AuthLayout>{page}</AuthLayout>
      </AuthProvider>
      <ToastContainer
        position="bottom-left"
        autoClose={4000}
        closeOnClick
        draggable
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
    </>
  )
}
