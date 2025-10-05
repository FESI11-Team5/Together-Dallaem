import { signupErrors } from '@/constants/error';
import * as z from 'zod';
import { SignupValidator } from './signupValidator';

export const zodSchema = z
	.object({
		email: z.email({ error: signupErrors.emailInvalid }),
		password: z.string().min(8, { error: signupErrors.passwordTooShort }),
		confirm: z.string(),
		name: z.string().min(1, { error: signupErrors.nameRequired }),
		companyName: z.string().min(1, { error: signupErrors.companyRequired })
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

