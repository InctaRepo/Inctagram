import Link from 'next/link';
import {NextPageWithLayout} from '@/src/pages/_app';
import {getAuthLayout} from '@/src/components/Layout/AuthLayout/AuthLayout';
import {Typography} from '@/src/components/ui/typography';


const Home: NextPageWithLayout = () => {
	return (
		<>
			<div><Typography as={'h1'}>Development links</Typography></div>
			<ul>
				<li><h2><Link href={'/auth/sign-up'}>Sign Up</Link></h2></li>

				<li><h2><Link href={'/auth/sign-in'}>Sign In</Link></h2></li>
				<li><h2><Link href={'/auth/email-sent'}>email-sent</Link></h2></li>
				<li><h2><Link href={'/auth/email-confirmed'}>email-confirmed</Link></h2></li>
				<li><h2><Link href={'/auth/email-link-expired'}>email-link-expired</Link></h2></li>
				<li><h2><Link href={'/auth/forgot-password'}>forgot-password</Link></h2></li>
				<li><h2><Link href={'/auth/create-password'}>create-password</Link></h2></li>
			</ul>
		</>
	)
}

Home.getLayout = getAuthLayout
export default Home
