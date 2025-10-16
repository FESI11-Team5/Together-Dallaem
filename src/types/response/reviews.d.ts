import { Gathering } from './gatherings';
import { UserInfo } from './user';

/** 리뷰 정보 */
export interface Review {
	/** 리뷰가 속한 팀 ID */
	teamId: number;

	/** 리뷰 ID */
	id: number;

	/** 점수 (1~5) */
	score: number;

	/** 리뷰 내용 */
	comment: string;

	/** 작성일시 (ISO 8601 문자열) */
	createdAt: string;

	/** 리뷰가 작성된 모임 정보 */
	gathering: Gathering;

	/** 리뷰 작성자 정보 */
	user: UserInfo;
}
