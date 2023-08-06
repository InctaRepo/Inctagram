import {z} from 'zod'

export const registerSchema = z
	.object({
		//TODO username unique check
		username: z.string().trim().nonempty('Enter username')
			.min(6, 'Min number of characters 6')
			.max(30, 'Max number of characters 30'),
		email: z.string().trim().nonempty('Enter email').email('Email must contain A-Z, a-z , @'),
		terms: z.boolean().refine(value => value, {message: 'Agree to the terms and policy'}),
		password: z
			.string()
			.trim()
			//TODO check regexp
			.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~])[a-zA-Z\d!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~]{8,}$/,
				'Password must contain a-z, A-Z,  ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~')
			.nonempty('Enter password')
			.min(6, 'Min number of characters 6')
			.max(20, 'Max number of characters 20'),
		passwordConfirmation: z.string().trim(),
	})
	.refine(data => data.password === data.passwordConfirmation, {
		message: 'The passwords must match',
		path: ['passwordConfirmation'],
	})
