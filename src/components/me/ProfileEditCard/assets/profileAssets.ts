/**
 * 화면 크기별 프로필 카드 이미지 자원
 *
 * @constant {Object} profileAssets
 * @property {Object} mobile - 모바일 화면용 이미지
 * @property {{src: string, width: number, height: number}} mobile.bg - 배경 이미지 정보
 * @property {{src: string, width: number, height: number}} mobile.edit - 편집 버튼 이미지 정보
 * @property {Object} tablet - 태블릿 화면용 이미지
 * @property {{src: string, width: number, height: number}} tablet.bg - 배경 이미지 정보
 * @property {{src: string, width: number, height: number}} tablet.edit - 편집 버튼 이미지 정보
 * @property {Object} desktop - 데스크탑 화면용 이미지
 * @property {{src: string, width: number, height: number}} desktop.bg - 배경 이미지 정보
 * @property {{src: string, width: number, height: number}} desktop.edit - 편집 버튼 이미지 정보
 */
export const profileAssets = {
	mobile: {
		bg: { src: '/images/profile_bg_mobile.svg', width: 156, height: 46 },
		edit: { src: '/images/profile_edit.svg', width: 56, height: 56 }
	},
	tablet: {
		bg: { src: '/images/profile_bg_tablet.svg', width: 156, height: 38 },
		edit: { src: '/images/profile.svg', width: 56, height: 56 }
	},
	desktop: {
		bg: { src: '/images/profile_bg_desktop.svg', width: 158, height: 48 },
		edit: { src: '/images/profile.svg', width: 56, height: 56 }
	}
};
