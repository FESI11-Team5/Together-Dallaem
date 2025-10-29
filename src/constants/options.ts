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
	{ value: 'deadlineSoon', text: '마감 임박' },
	{ value: 'manyParticipants', text: '인기순' }
] as const;

export const SORT_CONFIG = {
	newest: { sortBy: 'dateTime', sortOrder: 'desc' },
	deadlineSoon: { sortBy: 'registrationEnd', sortOrder: 'asc' },
	manyParticipants: { sortBy: 'participantCount', sortOrder: 'desc' }
} as const;


export const DROPDOWN_MENU_OPTIONS: OptionType[] = [
	{ value: 'myPage', text: '마이페이지' },
	{ value: 'signout', text: '로그아웃' }
] as const;

export const NAVBAR_MENU_LINKS = [
	{ href: '/', label: '크루 찾기' },
	{ href: '/favorites', label: '찜한 크루' },
	{ href: '/reviews', label: '모든 리뷰' }
] as const;