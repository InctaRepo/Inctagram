import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import {z} from 'zod'

import s from './register-form.module.scss'
import {registerSchema} from '@/src/common/schemas/register-schema';
import {Card} from '@/src/components/ui/card-temporary';
import {Typography} from '@/src/components/ui/typography';
import {ControlledCheckbox, ControlledTextField} from '@/src/components/ui/controlled';
import {Button} from '@/src/components/ui/button';
import GoogleIcon from '@/src/assets/icons/google-icon';
import GithubIcon from '@/src/assets/icons/github-icon';
import Link from 'next/link';


export type RegisterFormType = z.infer<typeof registerSchema>

type RegisterFormPropsType = {
	linkPath: string
	onSubmitHandler: (data: RegisterFormType) => void
}

export const RegisterForm = (props: RegisterFormPropsType) => {
	const {linkPath, onSubmitHandler} = props

	const {control, handleSubmit, formState} = useForm<RegisterFormType>({
		resolver: zodResolver(registerSchema),
		mode: 'onChange'
	})

	const onSubmit = handleSubmit(data => {
		onSubmitHandler(data)
	})

	return (
		<Card className={s.card}>
			<Typography variant={'h1'} className={s.title}>Sign Up</Typography>
			<div className={s.oauth}>
				<Link href={'/google'}>
					<GoogleIcon/>
				</Link>
				<Link href={'/github'}>
					<GithubIcon/>
				</Link>
			</div>
			<form onSubmit={onSubmit}>
				<ControlledTextField control={control} name={'username'} label={'Username'} className={s.field}/>
				<ControlledTextField
					control={control}
					name={'email'}
					label={'Email'}
					className={s.field}
				/>
				<ControlledTextField
					control={control}
					name={'password'}
					type={'password'}
					label={'Password'}
					className={s.field}
				/>
				<ControlledTextField
					control={control}
					name={'passwordConfirmation'}
					type={'password'}
					label={'Password confirmation'}
					className={s.lastField}
				/>
				<div className={s.terms}>
					<ControlledCheckbox control={control} name={'terms'}/>
					<Typography variant={'small'} className={s.termsRow}>
						I agree to the
						<Link href={'/terms'} className={s.termsLink}>Terms of Service</Link>
						and
						<Link href={'/policy'} className={s.termsLink}>Privacy Policy</Link>
					</Typography>
				</div>
				<Button type={'submit'} fullWidth className={s.registerBtn} disabled={!formState.isValid}>
					<Typography variant={'h3'}>Sign Up</Typography>
				</Button>
			</form>
			<Typography variant={'regular16'} className={s.subtitle}>
				Do you have an account?
			</Typography>
			<Button as={'a'} variant={'text'} href={linkPath}>
				Sign in
			</Button>
		</Card>
	)
}

