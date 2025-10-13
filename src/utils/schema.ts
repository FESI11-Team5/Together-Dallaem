import { SIGNIN_ERRORS } from '@/constants/error';
import * as z from 'zod';

export const signinSchema = z.object({
	email: z.email({ error: SIGNIN_ERRORS.INVALID_EMAIL }),
	password: z.string().min(8, { error: SIGNIN_ERRORS.TOO_SHORT_PASSWORD })
});

// TODO: SignupValidator 정리 후 signupSchema 해당 파일로 이동
