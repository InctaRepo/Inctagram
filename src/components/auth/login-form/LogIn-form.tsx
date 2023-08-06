import React from "react";
import s from "./login-form.module.scss";
import { Typography } from "../../ui/typography";
import Link from "next/link";
import { TextField } from "../../ui/TextField/TextField";
import { Button } from "../../ui/button";

export const LogInform: React.FC = (props: any) => {
	return (
		<div className={s.divWrap}>
			<Typography variant="h1">Sing In</Typography>
			<div className={s.oauthWrap}>
				<Link href={"/google"}>Google</Link>
				<Link href={"/github"}>Github</Link>
			</div>
			<TextField label="Email" type="text" />
			<TextField label="Password" type="password" />
			<div className={s.wrapLinkForgotPass}>
				<Button variant="text">
					<Typography variant="medium14" className={s.linkForgotPass}>
						Forgot Password
					</Typography>
				</Button>
			</div>
			<Button variant="primary" fullWidth={true}>
				<Typography variant="bold16">Sing In</Typography>
			</Button>
			<Typography variant="regular16">Don’t have an account?</Typography>
			<Button variant="link">
				<Typography variant="regular16" className={s.linkSingUP}>
					Sing Up
				</Typography>
			</Button>
		</div>
	);
};
