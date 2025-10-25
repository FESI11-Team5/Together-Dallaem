import { UserData } from '@/stores/user';

/**
 * 모임 타입을 나타내는 타입 (스웨거 스펙 기반)
 */
export type GatheringType = 'DALLAEMFIT' | 'OFFICE_STRETCHING' | 'MINDFULNESS' | 'WORKATION';

/**
 * 모임 장소를 나타내는 타입 (스웨거 스펙 기반)
 */
export type GatheringLocation = '건대입구' | '을지로3가' | '신림' | '홍대입구';

/**
 * 모임 정보를 나타내는 인터페이스 (스웨거 스펙 기반)
 */
export interface Gathering {
	/** 팀 ID */
	teamId: number;
	/** 모임 ID */
	id: number;
	/** 모임 타입 */
	type: GatheringType;
	/** 모임명 */
	name: string;
	/** 모임 일시 (ISO 8601 형식 문자열) */
	dateTime: string;
	/** 등록 마감일시 (ISO 8601 형식 문자열) */
	registrationEnd: string;
	/** 모임 장소 */
	location: string;
	/** 참가자 수 */
	participantCount: number;
	/** 정원 */
	capacity: number;
	/** 모임 이미지 URL */
	image: string;
	/** 생성자 ID */
	createdBy: number;
	/** 취소일시 (ISO 8601 형식 문자열, 취소되지 않은 경우 null) */
	canceledAt: string | null;
}

/**
 * 로그인된 사용자가 참석한 모임 정보
 */
export interface JoinedGathering extends Gathering {
	/** 참석한 일시 (ISO 8601 형식 문자열) */
	joinedAt: string;
	/** 모임 종료 여부 */
	isCompleted: boolean;
	/** 후기 작성 여부 */
	isReviewed: boolean;
}

/**
 * 모임에 참가한 사용자
 */
export interface GatheringParticipant {
	/** 팀 ID */
	teamId: number;
	/** 참가자 ID */
	userId: number;
	/** 참가 모임 ID */
	gatheringId: number;
	/** 참가 날짜 */
	joinedAt: string;
	/** 참가자 프로필 정보*/
	User: UserData;
}
