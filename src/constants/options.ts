import type { OptionType } from '@/components/commons/basic/BasicDropbox';
import type { TabOption } from '@/components/commons/Tab';

export const TYPE_OPTIONS: TabOption[] = [
	{ value: 'DALLAEMFIT', text: '함께 플레이', icon: '/icons/find_crew.svg' },
	{ value: 'WORKATION', text: '교환/통신하기', icon: '/icons/exchange.svg' }
] as const;

export const TABS: TabOption[] = [
	{ value: 'JoinedGathering', text: '나의 크루' },
	{ value: 'MyReview', text: '나의 리뷰' },
	{ value: 'CreatedGathering', text: '내가 만든 크루' }
] as const;

export const SUB_TYPE_OPTIONS: TabOption[] = [
	{ value: 'DALLAEMFIT', text: '전체' },
	{ value: 'OFFICE_STRETCHING', text: '스팀', icon: '/icons/steam_logo.svg' },
	{ value: 'MINDFULNESS', text: '온라인', icon: '/icons/online.svg' }
] as const;

export const GENRE_OPTIONS: OptionType[] = [
	{ value: '', text: '장르 전체' },
	{ value: '건대입구', text: 'AOS' },
	{ value: '을지로3가', text: 'Adventure' },
	{ value: '신림', text: 'FPS' },
	{ value: '홍대입구', text: 'RPG' }
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

export type Location = '건대입구' | '을지로3가' | '신림' | '홍대입구';

export const GENRE_BY_LOCATION = {
	건대입구: 'AOS',
	을지로3가: 'Adventure',
	신림: 'FPS',
	홍대입구: 'RPG'
} as const;
