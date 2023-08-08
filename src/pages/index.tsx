import Link from 'next/link';
import Header from '../components/ui/Header/Header';
import { Cards } from '../components/ui/Cards/Cards';

export default function Home() {
	return (
		<div>
			<div>
				<Header/>
				<Cards/>
			</div>
		</div>
	);
}
