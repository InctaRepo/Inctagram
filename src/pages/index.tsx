import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.scss";
import { Test } from "@/components/Test";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	return (
		<div className={styles.test}>
			<Test />
			Hello next App!
		</div>
	);
}
