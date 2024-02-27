import { MergerAccountsDynamic } from '@/features/auth/mergerAccounts'
import { getAuthLayout } from '@/widgets/layout/authLayout'

const MergerAccountsPage = () => <MergerAccountsDynamic />

MergerAccountsPage.getLayout = getAuthLayout
export default MergerAccountsPage
