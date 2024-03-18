import { MergerAccountsDynamic } from '@/features/auth/mergerAccounts'
import { GetAuthLayout } from '@/widgets/layout/authLayout'

const MergerAccountsPage = () => <MergerAccountsDynamic />

MergerAccountsPage.getLayout = GetAuthLayout
export default MergerAccountsPage
