import { signinErrors } from '@/constants/error';
import * as z from 'zod';

export const signinSchema = z.object({
	id: z.email({ error: signinErrors.idInvalid }),
	password: z.string().min(8, { error: signinErrors.passwordTooShort })
});
