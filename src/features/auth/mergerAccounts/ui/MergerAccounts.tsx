import MergerIcon from 'public/icon/mergerIcon.svg'
import { AuthPage } from '../../authPage'

export const MergerAccounts = () => {
  return (
    <AuthPage
      title="Merger of Accounts"
      text="The user with email Epam@epam.com is already in the system. Could we merge this accounts?"
      nameButton="Yes, merge"
      nameButtonTwo="No"
      variant="merger"
    >
      <MergerIcon />
    </AuthPage>
  )
}
