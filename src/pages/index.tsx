import Link from 'next/link';

export default function Home() {
	return (
		<div>
			Hello next App!
			<div>
				<Link href={'/sign-up'}>Sign Up</Link>
			</div>
		</div>
	);
}
