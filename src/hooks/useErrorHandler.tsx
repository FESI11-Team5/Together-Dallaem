import { useCallback } from 'react';
import { useModal } from '@/hooks/useModal';
import BasicPopup from '@/components/commons/basic/BasicPopup';

const DEFAULT_ERROR_MESSAGE = '요청을 처리하는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';

export const useErrorHandler = () => {
	const { openModal } = useModal();

	const getErrorMessage = useCallback((err: unknown): string => {
		if (!err) return DEFAULT_ERROR_MESSAGE;
		if (typeof err === 'string') return err;
		if (err instanceof Error) return err.message;
		return DEFAULT_ERROR_MESSAGE;
	}, []);

	const handleError = useCallback(
		(err: unknown) => {
			// 개발 환경에서는 콘솔에 에러를 남겨 빠르게 디버깅할 수 있도록 합니다.
			if (process.env.NODE_ENV !== 'production') console.error(err);
			openModal(<BasicPopup title="" subTitle={getErrorMessage(err)} confirmText="확인" />);
		},
		[openModal, getErrorMessage]
	);

	return { getErrorMessage, handleError };
};
