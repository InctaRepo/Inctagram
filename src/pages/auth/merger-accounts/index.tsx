import { MergerAccountsDynamic } from '@/src/features/auth/mergerAccounts'
import { getAuthLayout } from '@/src/widgets/layout/authLayout'

const MergerAccountsPage = () => {
  return <MergerAccountsDynamic />
}

MergerAccountsPage.getLayout = getAuthLayout
export default MergerAccountsPage
