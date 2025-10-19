import { GatheringLocation, GatheringType } from './gatherings';

export interface CreateGathering {
	/** 팀 ID */
	teamId?: number;
	/** 모임명 */
	name: string;
	/** 모임 장소 */
	location: GatheringLocation;
	/** 모임 타입 */
	type: GatheringType | null;
	/** 모임 일시 */
	dateTime: string;
	/** 등록 마감일시 */
	registrationEnd: string;
	/** 정원 */
	capacity: number;
	/** 이미지 파일 (업로드용) */
	image: File | null;
}
