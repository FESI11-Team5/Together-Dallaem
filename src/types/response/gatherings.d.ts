/**
 * 모임 타입을 나타내는 타입
 */
export type GatheringType = 'DALLAEMFIT' | 'OFFICE_STRETCHING' | 'MINDFULNESS' | 'WORKATION';

/**
 * 모임 장소를 나타내는 타입
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
	type: GatheringType | '';
	/** 모임 장소 */
	location: GatheringLocation | '';
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
	image: File | null;
	/** 생성자 ID */
	createdBy: number;
	/** 취소일시 (ISO 8601 형식 문자열, 취소되지 않은 경우 null) */
	canceledAt: string | null;
}
