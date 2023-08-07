import React from "react";
import s from "./login-form.module.scss";
import { Typography } from "../../ui/typography";
import Link from "next/link";
import { TextField } from "../../ui/TextField/TextField";
import { Button } from "../../ui/button";
import { ZodType, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

type FormDataType = {
	email: string;
	password: string;
};

const schema: ZodType<FormDataType> = z.object({
	email: z.string().email(),
	password: z.string().min(3).max(20),
});

export const LogInform: React.FC = (props: any) => {
	const { register, handleSubmit } = useForm<FormDataType>({
		resolver: zodResolver(schema),
	});
	const submitData = (data: FormDataType) => {
		alert(data);
	};

	return (
		<form onSubmit={handleSubmit(submitData)} className={s.divWrap}>
			<Typography variant="h1">Sing In</Typography>
			<div className={s.oauthWrap}>
				<Link href={"/google"}>Google</Link>
				<Link href={"/github"}>Github</Link>
			</div>
			<TextField label="Email" type="text" fullWidth />
			<TextField label="Password" type="password" fullWidth />
			<div className={s.wrapLinkForgotPass}>
				<Button variant="text">
					<Typography variant="medium14" className={s.linkForgotPass}>
						Forgot Password
					</Typography>
				</Button>
			</div>
			<Button type="submit" variant="primary" fullWidth={true}>
				<Typography variant="bold16">Sing In</Typography>
			</Button>
			<Typography variant="regular16">Don’t have an account?</Typography>
			<Button variant="link">
				<Typography variant="regular16" className={s.linkSingUP}>
					Sing Up
				</Typography>
			</Button>
		</form>
	);
};
