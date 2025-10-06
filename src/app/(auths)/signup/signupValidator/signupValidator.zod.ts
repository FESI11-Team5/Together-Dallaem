import { signupErrors } from '@/constants/error';
import * as z from 'zod';
import { SignupValidator } from './signupValidator';

export const zodSchema = z
	.object({
		name: z.string().min(1, { error: signupErrors.nameRequired }),
		email: z.email({ error: signupErrors.emailInvalid }),
		companyName: z.string().min(1, { error: signupErrors.companyRequired }),
		password: z.string().min(8, { error: signupErrors.passwordTooShort }),
		confirm: z.string().min(1, { error: signupErrors.confirmRequired })
	})
	.refine(data => data.password === data.confirm, {
		path: ['confirm'],
		message: signupErrors.passwordMismatch
	});

export const signupValidatorZod: SignupValidator = {
	validate(values) {
		const result = zodSchema.safeParse(values);
		if (result.success) return { fieldErrors: {} };
		const fieldErrors = Object.fromEntries(result.error.issues.map(i => [i.path[0], i.message]));
		return { fieldErrors };
	}
};
