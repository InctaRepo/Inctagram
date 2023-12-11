import { MergerAccounts } from '@/src/features/auth/mergerAccounts'
import { getAuthLayout } from '@/src/widgets/layout/authLayout'

const MergerAccountsPage = () => {
  return <MergerAccounts />
}

MergerAccountsPage.getLayout = getAuthLayout
export default MergerAccountsPage
