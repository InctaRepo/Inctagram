import { AuthPage } from '@/entities/auth/authPage'
import MergerIcon from '@/public/icon/mergerIcon.svg'

export const MergerAccounts = () => {
  return (
    <AuthPage
      nameButton={'Yes, merge'}
      nameButtonTwo={'No'}
      text={
        'The user with email Epam@epam.com is already in the system. Could we merge this accounts?'
      }
      title={'Merger of Accounts'}
      variant={'merger'}
    >
      <MergerIcon />
    </AuthPage>
  )
}
