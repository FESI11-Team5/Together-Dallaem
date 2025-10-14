'use client';

import RequiredLoginPopup from '@/components/auth/Popup/RequiredLoginPopup';
import { useModal } from '@/hooks/useModal';
import { isAuthenticated } from '@/utils/token';
import { usePathname } from 'next/navigation';
import { ComponentType } from 'react';

interface WithAuthGuardProps {
	onClick?: () => void;
}

/**
 * 고차 컴포넌트(HOC)로, 주어진 컴포넌트의 `onClick` 이벤트를 가로채어
 * 인증 여부를 확인한 후 동작을 실행합니다.
 *
 * - 인증되지 않은 경우: 로그인 페이지(`/login`)로 리다이렉트합니다.
 *   (현재 경로를 `next` 파라미터로 함께 전달)
 * - 인증된 경우: 원래 컴포넌트의 `onClick` 이벤트 핸들러를 호출합니다.
 *
 * @template T - 감싸는 컴포넌트의 props 타입 (최소한 `onClick` 포함)
 * @param {ComponentType<T>} Component - 인증 가드를 적용할 컴포넌트
 * @returns {React.FC<T>} 인증 가드가 적용된 컴포넌트
 *
 * @example
 * ```tsx
 * import { withGuard } from '@/hoc/withGuard';
 * import { Button } from '@/components/ui/button';
 *
 * const GuardedButton = withGuard(Button);
 *
 * <GuardedButton onClick={() => console.log('참가!')}>
 *   참가하기
 * </GuardedButton>
 * ```
 */
export function withGuard<T extends WithAuthGuardProps>(Component: ComponentType<T>) {
	return function AuthGuarded(props: T) {
		const { openModal } = useModal();
		const pathname = usePathname();

		const handleClick = () => {
			if (!isAuthenticated()) {
				openModal(<RequiredLoginPopup next={pathname} />);
			}

			props.onClick?.();
		};

		return <Component {...props} onClick={handleClick} />;
	};
}
