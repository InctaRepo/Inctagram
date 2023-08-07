import {RegisterForm, RegisterFormType} from '@/src/components/auth/register-form';
import s from './sign-up.module.scss'

const SignUp = () => {
	const submit = (data: RegisterFormType) => {
		console.log(data)
	}
	return (
		<div className={s.container}>
			<RegisterForm linkPath={'#'} onSubmitHandler={submit}/>
		</div>
	);
};
export default SignUp