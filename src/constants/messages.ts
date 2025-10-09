export interface PopupMessage {
	title: string;
	subTitle?: string;
}

export type PopupMessageKey = 'CREATE' | 'NOT_LOGIN' | 'SIGNUP' | 'DUPLICATED_EMAIL' | 'UPDATE_PROFILE' | 'REVIEWS';

export const POPUP_MESSAGE: Record<PopupMessageKey, PopupMessage> = {
	/** 게시글 작성페이지에서 나갈 시 띄우는 팝업창 메세지 */
	CREATE: {
		title: '정말로 나가시겠어요?',
		subTitle: '작성된 내용이 모두 삭제됩니다.'
	},

	/** 로그인하지 않은 상태에서 특정 기능을 사용하려고 할 때 띄우는 팝업창 메세지 */
	NOT_LOGIN: {
		title: '로그인이 필요해요'
	},

	/** 회원가입 완료 후 띄우는 팝업창 메세지 */
	SIGNUP: {
		title: '가입이 완료되었습니다!'
	},

	/** 회원가입 시 중복 이메일이면 띄우는 팝업창 메시지 */
	DUPLICATED_EMAIL: {
		title: '중복된 이메일입니다',
		subTitle: '다른 이메일로 가입해 주세요'
	},

	/** 프로필 수정 완료 후 띄우는 팝업창 메세지 */
	UPDATE_PROFILE: {
		title: '프로필이 성공적으로 수정되었습니다!'
	},

	/** 리뷰 작성 완료 후 띄우는 팝업창 메세지 */
	REVIEWS: {
		title: '리뷰가 성공적으로 등록되었습니다!'
	}

	/* 추가 메시지 유형은 여기에 추가 */
};

/** 푸터 메세지 */
export const FOOTER_MESSAGE = {
	title: '더 건강한 나와 팀을 위한 프로그램 🏃🏻',
	subTitle: '모임을 공유해서 더 많은 사람들이 참여할 수 있도록 독려해봐요'
};
