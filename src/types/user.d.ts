/**
 * 사용자 정보를 나타내는 인터페이스
 *
 * @interface UserInfo
 */
export interface UserInfo {
	/** 소속 팀 ID */
	teamId: number;

	/** 사용자 고유 ID */
	id: number;

	/** 사용자 이름 */
	name: string;

	/** 사용자 이메일 주소 */
	email: string;

	/** 사용자가 속한 회사 이름 */
	companyName: string;

	/** 사용자 프로필 이미지 URL (선택적) */
	image?: string;

	/** 사용자 정보 생성일시 (ISO 문자열) */
	createdAt: string;

	/** 사용자 정보 수정일시 (ISO 문자열) */
	updatedAt: string;
}
