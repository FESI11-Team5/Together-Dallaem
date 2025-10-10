import { SIGNIN_ERRORS } from '@/constants/error';
import * as z from 'zod';

export const signinSchema = z.object({
	id: z.email({ error: SIGNIN_ERRORS.INVALID_ID }),
	password: z.string().min(8, { error: SIGNIN_ERRORS.TOO_SHORT_PASSWORD })
});
