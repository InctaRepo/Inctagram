import { useSearchParams } from 'next/navigation'

import { getAuthLayout } from '@/widgets/layout/authLayout'

const SuccessPage = () => {
  const searchParams = useSearchParams()

  return <div>{searchParams ? searchParams.get('token') : 'token not found'}</div>
}

SuccessPage.getLayout = getAuthLayout
export default SuccessPage
