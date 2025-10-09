import { signupErrors } from '@/constants/error';
import * as yup from 'yup';
import type { SignupValidator } from './signupValidator';

export const yupSchema = yup.object({
	name: yup.string().required(signupErrors.nameRequired),
	email: yup.string().required().email(signupErrors.emailInvalid),
	companyName: yup.string().required(signupErrors.companyRequired),
	password: yup.string().required().min(8, signupErrors.passwordTooShort),
	confirm: yup
		.string()
		.required(signupErrors.confirmRequired)
		.oneOf([yup.ref('password')], signupErrors.passwordMismatch)
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
