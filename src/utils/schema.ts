import { CREATE_GATHERING_ERRORS, SIGNIN_ERRORS } from '@/constants/error';
import type { GatheringLocation, GatheringType } from '@/types/response/gatherings';

import * as z from 'zod';

/** 이미지 파일 크기 (5MB) */
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const signinSchema = z.object({
	email: z.email({ error: SIGNIN_ERRORS.INVALID_EMAIL }),
	password: z.string().min(8, { error: SIGNIN_ERRORS.TOO_SHORT_PASSWORD })
});

// TODO: SignupValidator 정리 후 signupSchema 해당 파일로 이동

export const Step1Schema = z.object({
	name: z
		.string()
		.nonempty({ error: CREATE_GATHERING_ERRORS.EMPTY.NAME })
		.min(2, { error: CREATE_GATHERING_ERRORS.LIMIT.MIN.NAME })
		.max(20, { error: CREATE_GATHERING_ERRORS.LIMIT.MAX.NAME })
		.regex(
			/^(?!\s)[ㄱ-ㅎ가-힣a-zA-Z0-9\s!@#$%^&*(),.?":{}|<>~`'_=+\-\\/\[\];]+(?<!\s)$/,
			CREATE_GATHERING_ERRORS.FORMAT.NAME
		),

	location: z.custom<GatheringLocation>(val => typeof val === 'string' && val.length > 0, {
		error: CREATE_GATHERING_ERRORS.EMPTY.LOCATION
	})
});

export const Step2Schema = z.object({
	type: z.custom<GatheringType>(val => typeof val === 'string' && val.length > 0, {
		error: CREATE_GATHERING_ERRORS.EMPTY.TYPE
	}),
	image: z
		.instanceof(File, { message: CREATE_GATHERING_ERRORS.EMPTY.IMAGE })
		.refine(file => file.size > 0, {
			message: CREATE_GATHERING_ERRORS.EMPTY.IMAGE
		})
		.refine(file => file.size <= MAX_FILE_SIZE, {
			message: CREATE_GATHERING_ERRORS.LIMIT.MAX.IMAGE
		})
});

export const Step3Schema = z
	.object({
		dateTime: z.string().nonempty({ message: CREATE_GATHERING_ERRORS.EMPTY.DATE_TIME }),
		registrationEnd: z.string().nonempty({ message: CREATE_GATHERING_ERRORS.EMPTY.REGISTRATION_END })
	})
	.superRefine((value, ctx) => {
		const now = new Date();
		const { dateTime, registrationEnd } = value;
		const selected = new Date(dateTime);
		const end = new Date(registrationEnd);

		if (selected <= now) {
			ctx.addIssue({
				code: 'custom',
				message: CREATE_GATHERING_ERRORS.INVALID_VALUES.DATE_TIME,
				path: ['dateTime']
			});
		}

		if (end >= selected) {
			ctx.addIssue({
				code: 'custom',
				message: CREATE_GATHERING_ERRORS.INVALID_VALUES.REGISTRATION_END,
				path: ['registrationEnd']
			});
		}

		if (end <= now) {
			ctx.addIssue({
				code: 'custom',
				message: CREATE_GATHERING_ERRORS.INVALID_VALUES.DATE_TIME,
				path: ['registrationEnd']
			});
		}
	});

export const Step4Schema = z.object({
	capacity: z
		.number({ error: CREATE_GATHERING_ERRORS.EMPTY.CAPACITY })
		.min(5, { error: CREATE_GATHERING_ERRORS.LIMIT.MIN.CAPACITY })
		.max(20, { error: CREATE_GATHERING_ERRORS.LIMIT.MAX.CAPACITY })
});

/** 모임 생성 스키마 */
export const CreateGatheringSchema = z.object({
	...Step1Schema.shape,
	...Step2Schema.shape,
	...Step3Schema.shape,
	...Step4Schema.shape
});

export const profileEditSchema = z.object({
	companyName: z.string().min(2, { error: '회사명을 입력해주세요.' })
});

export type Step1SchemaType = z.infer<typeof Step1Schema>;
export type Step2SchemaType = z.infer<typeof Step2Schema>;
export type Step3SchemaType = z.infer<typeof Step3Schema>;
export type Step4SchemaType = z.infer<typeof Step4Schema>;

export type GatheringSchemaType = z.infer<typeof CreateGatheringSchema>;
export type ProfileEditSchemaType = z.infer<typeof profileEditSchema>;
