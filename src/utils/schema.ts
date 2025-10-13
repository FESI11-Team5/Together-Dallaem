import type { GatheringLocation, GatheringType } from '@/types/response/gatherings';

import * as z from 'zod';

/** 모임 생성 스키마 */
export const CreateGatheringSchema = z.object({
	teamId: z.number(),
	name: z
		.string()
		.min(4, { error: '모임 이름은 최소 4자 이상이어야 합니다.' })
		.max(20, { error: '모임 이름은 최대 20자 이하이어야 합니다.' })
		.regex(/^[ㄱ-ㅎ가-힣a-zA-Z0-9]{4,30}$/, '모임 이름은 한글, 영어, 숫자만 사용할 수 있습니다.'),

	location: z.custom<GatheringLocation>(val => typeof val === 'string' && val.length > 0, {
		error: '모임 장소를 선택해주세요.'
	}),

	type: z.custom<GatheringType>(val => typeof val === 'string' && val.length > 0, {
		error: '모임 유형을 선택해주세요.'
	}),

	dateTime: z.iso.datetime({ error: '모임 날짜를 입력해주세요' }),

	registrationEnd: z.iso.datetime({ error: '마감 날짜를 입력해주세요' }),

	capacity: z
		.number({ error: '정원은 숫자만 입력하여야 합니다.' })
		.min(5, { error: '최소 5명 이상이어야 합니다.' })
		.max(20, { error: '최대 20명 이하이어야 합니다.' }),

	image: z.string().nonempty({ error: '이미지를 첨부해주세요' })
});

// 나머지 스키마 정의를 이어서 작성해주세요

export type GatheringSchemaType = z.infer<typeof CreateGatheringSchema>;
// 검사 타입을 이어서 작성해주세요
