import { getAuthLayout } from 'src/widgets/layout/authLayout'
import { MergerAccounts } from '@/src/features/auth/mergerAccounts/MergerAccounts'

const MergerAccountsPage = () => {
  return <MergerAccounts />
}

MergerAccountsPage.getLayout = getAuthLayout
export default MergerAccountsPage
