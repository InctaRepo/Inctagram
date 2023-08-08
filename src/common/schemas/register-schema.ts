import {z} from 'zod'

export const registerSchema = z
	.object({
		username: z
			.string()
			.trim()
			.nonempty('Enter username')
			.min(6, 'Min number of characters 6')
			.max(30, 'Max number of characters 30'),
		email: z.string().trim().nonempty('Enter email').email('Email must contain A-Z, a-z , @'),
		terms: z.boolean().refine(value => value, {message: 'Agree to the terms and policy'}),
		password: z
			.string()
			.trim()
			.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/,
				'Password must contain a-z, A-Z, ! @ # $ % ^ & *')
			.nonempty('Enter password')
			.min(6, 'Min number of characters 6')
			.max(20, 'Max number of characters 20'),
		passwordConfirm: z
			.string()
			.trim()
	}).refine(data => data.password === data.passwordConfirm, {
		message: 'The passwords must match',
		path: ['passwordConfirm'],
	})
