import type { OptionType } from '@/components/commons/basic/BasicDropbox';
import type { TabOption } from '@/components/commons/Tab';

export const TYPE_OPTIONS: TabOption[] = [
	{ value: 'DALLAEMFIT', text: '달램핏', icon: '/icons/dalaemfit.svg' },
	{ value: 'WORKATION', text: '워케이션', icon: '/icons/workation.svg' }
] as const;

export const SUB_TYPE_OPTIONS: OptionType[] = [
	{ value: 'DALLAEMFIT', text: '전체' },
	{ value: 'OFFICE_STRETCHING', text: '오피스 스트레칭' },
	{ value: 'MINDFULNESS', text: '마인드풀니스' }
] as const;

export const LOCATION_OPTIONS: OptionType[] = [
	{ value: '', text: '지역 전체' },
	{ value: '건대입구', text: '건대 입구' },
	{ value: '을지로3가', text: '을지로 3가' },
	{ value: '신림', text: '신림' },
	{ value: '홍대입구', text: '홍대 입구' }
] as const;

export const SORT_OPTIONS: OptionType[] = [
	{ value: 'newest', text: '최신순' },
	{ value: 'oldest', text: '오래된순' },
	{ value: 'deadlineSoon', text: '마감 임박순' },
	{ value: 'deadlineLate', text: '마감 늦은순' },
	{ value: 'fewParticipants', text: '참여자 적은순' },
	{ value: 'manyParticipants', text: '참여자 많은순' }
] as const;

export const SORT_CONFIG = {
	newest: { sortBy: 'dateTime', sortOrder: 'desc' },
	oldest: { sortBy: 'dateTime', sortOrder: 'asc' },
	deadlineSoon: { sortBy: 'registrationEnd', sortOrder: 'asc' },
	deadlineLate: { sortBy: 'registrationEnd', sortOrder: 'desc' },
	fewParticipants: { sortBy: 'participantCount', sortOrder: 'asc' },
	manyParticipants: { sortBy: 'participantCount', sortOrder: 'desc' }
} as const;
