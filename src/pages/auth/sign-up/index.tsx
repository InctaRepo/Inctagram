import {RegisterForm, RegisterFormType} from '@/src/components/auth/register-form';
import {NextPageWithLayout} from '@/src/pages/_app';
import {getAuthLayout} from '@/src/components/Layout/AuthLayout/AuthLayout';
import {useRegistrationMutation} from '@/src/api/authApi/authApi';
import {Typography} from '@/src/components/ui/typography';

const SignUpPage: NextPageWithLayout = () => {

	const [register, {isError, isLoading, error, data, isSuccess}] = useRegistrationMutation()

	const submit = (data: RegisterFormType) => {
		const {terms, ...formData} = data; // exclude terms for query
		register(formData)
	}

	if (isLoading) {
		return <div>Loading...</div>
	} else
		return (
			<>
				{/*@ts-ignore*/}
				{isError && <Typography color={'error'}>{error?.data.message[0].message}</Typography>}
				{/*{isSuccess && <Typography color={'secondary'}>{data}</Typography>}*/}
				<RegisterForm linkPath={'#'} onSubmitHandler={submit}/>
			</>
			//TODO linkpath to sign in
		)
}

SignUpPage.getLayout = getAuthLayout
export default SignUpPage