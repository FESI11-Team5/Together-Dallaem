import { useEffect, useRef } from 'react';

interface UseKeyActionsProps {
	onEnter?: () => void;
	onEscape?: () => void;
	enabled?: boolean;
}

/**
 * Enter / Escape 키 입력 시 지정한 콜백을 실행하는 커스텀 훅입니다.
 *
 * - 리스너는 최초 1회만 등록됩니다.
 * - 콜백 변경 시에도 리스너는 재등록되지 않으며, ref로 최신 콜백을 유지합니다.
 * - enabled=false 시 리스너가 비활성화됩니다.
 *
 * @param {Function} [onEnter] Enter 키 입력 시 실행할 함수
 * @param {Function} [onEscape] Escape 키 입력 시 실행할 함수
 * @param {boolean} [enabled=true] 이벤트 리스너 활성화 여부
 *
 * @example
 * useKeyActions({
 *   onEnter: () => console.log('Enter pressed'),
 *   onEscape: () => console.log('Escape pressed'),
 *   enabled: isModalOpen
 * });
 */
export function useKeyActions({ onEnter, onEscape, enabled = true }: UseKeyActionsProps) {
	const enterRef = useRef(onEnter);
	const escapeRef = useRef(onEscape);

	useEffect(() => {
		enterRef.current = onEnter;
		escapeRef.current = onEscape;
	}, [onEnter, onEscape]);

	useEffect(() => {
		if (!enabled) return;

		const handleKeydown = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && escapeRef.current) {
				e.preventDefault();
				escapeRef.current();
			} else if (e.key === 'Enter' && enterRef.current) {
				e.preventDefault();
				enterRef.current();
			}
		};

		window.addEventListener('keydown', handleKeydown);
		return () => window.removeEventListener('keydown', handleKeydown);
	}, [enabled]);
}
