import { signinErrors } from '@/constants/error';
import * as z from 'zod';

export const signinSchema = z.object({
	email: z.email({ error: signinErrors.emailInvalid }),
	password: z.string().min(8, { error: signinErrors.passwordTooShort })
});
