import { signupErrors } from '@/constants/error';
import * as yup from 'yup';
import type { SignupValidator } from './signupValidator';

export const yupSchema = yup.object({
	email: yup.string().required().email(signupErrors.emailInvalid),
	password: yup.string().required().min(8, signupErrors.passwordTooShort),
	confirm: yup
		.string()
		.required()
		.oneOf([yup.ref('password')], signupErrors.passwordMismatch),
	name: yup.string().required(signupErrors.nameRequired),
	companyName: yup.string().required(signupErrors.companyRequired)
});

export const signupValidatorYup: SignupValidator = {
	validate(values) {
		try {
			yupSchema.validateSync(values, { abortEarly: false });
			return { fieldErrors: {} };
		} catch (err) {
			if (err instanceof yup.ValidationError) {
				const fieldErrors = Object.fromEntries(err.inner.map(e => [e.path, e.message]));
				return { fieldErrors };
			}
			throw err;
		}
	}
};

const defaultValues = {
	email: 'viscacha@email.com',
	password: 'viscacha88',
	confirm: 'viscacha88',
	name: 'viscacha',
	companyName: 'codeit'
};

console.log(signupValidatorYup.validate({ ...defaultValues, email: '' }));
