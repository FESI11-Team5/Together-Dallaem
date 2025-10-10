import { loginErrors } from '@/constants/error';
import * as z from 'zod';

export const loginSchema = z.object({
	email: z.email({ error: loginErrors.emailInvalid }),
	password: z.string().min(8, { error: loginErrors.passwordTooShort })
});
